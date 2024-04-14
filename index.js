
const calculateInSensitiveOrder= (a, b) => {
    try {
        const setA = new Set(a);
    const setB = new Set(b);

        // Calculate the size of the intersection
    let intersectionSize = 0;
    for (const char of setA) {
        if (setB.has(char)) {
            intersectionSize++;
        }
    }
    // Calculate similarity percentage based on the size of intersection and union
    const unionSize = setA.size + setB.size - intersectionSize;
    const similarityPercentage = (intersectionSize / unionSize) * 100;

    return similarityPercentage;
    } catch (error) {
        return 0
    }
    
};

const getSimilarity = (a, b, options = {}) => {
    const { caseSensitive = false, orderSensitive = true } = options;

    // Error handling for missing input strings
    if (a===null || b===null || a===undefined || b===undefined) {
      throw new Error("Input strings are required.");
    }
  
    // Validate input parameters
    if (
      typeof a !== "string" ||
      typeof b !== "string" ||
      typeof caseSensitive !== "boolean" ||
      typeof orderSensitive !== "boolean"
    ) {
      throw new TypeError("Invalid input parameters.");
    }
  
    if (!caseSensitive) {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }
  
    // Get the lengths of the input strings
    const lenA = a.length;
    const lenB = b.length;
  
    // Handle edge cases
    if (lenA === 0) return lenB === 0 ? 100 : 0;
    if (lenB === 0) return 0;

    // Calculate similarity based on options
    let similarityPercentage;
    if (!orderSensitive) {
      return calculateInSensitiveOrder(a, b);
    } else {
      // Initialize the Levenshtein distance matrix
      let prevRow = Array.from({ length: lenA + 1 }, (_, i) => i);
      for (let i = 1; i <= lenB; i++) {
        let currRow = [i];
        for (let j = 1; j <= lenA; j++) {
          const substitutionCost = a[j - 1] === b[i - 1] ? 0 : 1;
          currRow[j] = Math.min(
            prevRow[j - 1] + substitutionCost,
            currRow[j - 1] + 1,
            prevRow[j] + 1
          );
        }
        prevRow = currRow;
      }
    
      // Calculate similarity percentage based on Levenshtein distance
      const distance = prevRow[lenA];
      const maxLength = Math.max(lenA, lenB);
      similarityPercentage = 1 - distance / maxLength;
      if (similarityPercentage < 0) {
        similarityPercentage = 0; // Clamp similarity percentage to minimum of 0
      }
    }

    // Return similarity percentage
    return similarityPercentage * 100;
};

const getFilterOnCondition = (similarities, condition, threshold) => {
    switch (condition) {
        case '>':
            return similarities.filter(
                ({ Similarity }) => Similarity > threshold
              );
        case '<':
            return similarities.filter(
                ({ Similarity }) => Similarity < threshold
              );
        case '>=':
            return similarities.filter(
                ({ Similarity }) => Similarity >= threshold
              );
        case '<=':
            return similarities.filter(
                ({ Similarity }) => Similarity <= threshold
              );
        default:
            return similarities;
    }
};
const sortSimilarities = (similarities, orderBy, order) => {
    if (!orderBy || !order) {
        return similarities; // No sorting required
    }

    return similarities.sort((a, b) => {
        switch (orderBy) {
            case 'similarity':
                return order === 'ascending' ? a.Similarity - b.Similarity : b.Similarity - a.Similarity;
            case 'string':
                return order === 'ascending' ? a.Input.localeCompare(b.Input) : b.Input.localeCompare(a.Input);
            default:
                return 0; // No sorting
        }
    });
};


// Define the function for calculating similarity between a string and a multiple strings
const getSimilarities = (a, bArray, options = {}) => {
  const {
    threshold = 50,
    thresholdType = ">",
    orderBy = null,
    order = null,
    numberOfOutputs = null,
    caseSensitive = false,
    orderSensitive = false,
  } = options;

  // Error handling for missing input strings
  if (a===null || a===undefined || !bArray) {
    throw new Error("Input strings are required.");
  }

  // Validate input parameters
  if (
    typeof a !== "string" ||
    typeof bArray !== "object" ||
    typeof caseSensitive !== "boolean" ||
    typeof orderSensitive !== "boolean"
  ) {
    throw new TypeError("Invalid input parameters.");
  }
  if (
    orderBy && (typeof orderBy != "string" ||
    !["similarity", "string"].includes(orderBy))
  ) {
    throw new TypeError("Invalid order on parameters.");
  }
  if (order && typeof order != "string") {
    throw new TypeError("Invalid order type by parameters.");
  }
  if (numberOfOutputs && typeof numberOfOutputs != "number") {
    throw new TypeError("Invalid numberOfOutputs parameters.");
  }
  if (threshold < 0 || threshold > 100) {
    throw new RangeError("Threshold must be between 0 and 100.");
  }
  if (!["<",">","<=",">="].includes(thresholdType)){
    throw new RangeError(`Threshold Type must be amongst <, >, <=, or ,>=.`);
  }

  // Calculate similarity for each string in the array
  let similarities = bArray.map((b) => ({
    Input: b,
    Similarity: b!==null || a!==undefined
      ? getSimilarity(a, b, {
          caseSensitive: caseSensitive,
          orderSensitive: orderSensitive,
        })
      : 0,
  }));

  // Filter similarities below threshold
  if (threshold) {
    similarities = getFilterOnCondition(similarities, thresholdType, threshold)
  } else {
    return [];
  }

  // Sort the filtered similarities based on orderBy and order options
  similarities = sortSimilarities(similarities, orderBy, order)

  // Get the specified number of top similarity results
  if (numberOfOutputs) {
    similarities = similarities.slice(0, numberOfOutputs);
  }
  return similarities;
};

// Export the functions for use in other files
module.exports = { getSimilarity, getSimilarities };
