// index.js

// Precompute the Levenshtein distance matrix
const precomputeMatrix = (maxLenA, maxLenB) => {
  const matrix = [];

  // Initialize the first row
  matrix[0] = Array.from({ length: maxLenA + 1 }, (_, j) => j);

  // Initialize the first column
  for (let i = 1; i <= maxLenB; i++) {
    matrix[i] = [i];
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= maxLenB; i++) {
    for (let j = 1; j <= maxLenA; j++) {
      matrix[i][j] = 0; // Pre-initialized to 0 for static approach
    }
  }

  return matrix;
};

// Define the function for calculating string similarity
const getSimilarity = (a, b, options = {}) => {
  const { caseSensitive = false, orderSensitive = true } = options;

  if (!caseSensitive) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  }

  // Get the lengths of the input strings
  const lenA = a.length;
  const lenB = b.length;

  // Precompute the matrix
  const matrix = precomputeMatrix(lenA, lenB);

  // Fill the matrix with Levenshtein distance
  for (let i = 1; i <= lenB; i++) {
    for (let j = 1; j <= lenA; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          ) // deletion
        );
      }
    }
  }

  // Calculate the distance and maximum length of strings
  const distance = matrix[lenB][lenA];
  const maxLength = Math.max(lenA, lenB);

  // Calculate similarity percentage based on options
  let similarityPercentage;
  if (orderSensitive) {
    similarityPercentage = 1 - distance / maxLength;
  } else {
    similarityPercentage = 1 - distance / maxLength;
    if (similarityPercentage < 0) similarityPercentage = 0;
  }

  // Return similarity percentage
  return similarityPercentage * 100;
};

// Define the function for calculating similarity between a string and a multiple strings
const getSimilarities = (a, bArray, options = {}) => {
  // Default options
  const {
    threshold = 0,
    orderBy = "similarity",
    order = "descending",
    numberOfOutputs = Infinity,
    ...otherOptions
  } = options;

  // Calculate similarity for each string in the array
  const similarities = bArray.map((b) => ({
    Input: b,
    Similarity: getSimilarity(a, b, otherOptions),
  }));

  // Filter similarities below threshold
  const filteredSimilarities = similarities.filter(
    ({ Similarity }) => Similarity >= threshold
  );

  // Sort the filtered similarities based on orderBy and order options
  const sortedSimilarities = filteredSimilarities.sort((a, b) => {
    if (orderBy === "similarity") {
      return order === "ascending"
        ? a.Similarity - b.Similarity
        : b.Similarity - a.Similarity;
    } else if (orderBy === "name") {
      return order === "ascending"
        ? a.Input.localeCompare(b.Input)
        : b.Input.localeCompare(a.Input);
    }
  });

  // Get the specified number of top similarity results
  const topSimilarities = sortedSimilarities.slice(0, numberOfOutputs);

  return topSimilarities;
};

// Export the functions for use in other files
module.exports = { getSimilarity, getSimilarities };
