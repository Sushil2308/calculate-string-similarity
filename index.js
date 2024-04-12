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
  const { caseSensitive = false, orderSensitive = false } = options;

  // Error handling for missing input strings
  if (!a || !b) {
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

  // Precompute the matrix
  const matrix = precomputeMatrix(lenA, lenB);

  // Fill the matrix with Levenshtein distance
  for (let i = 1; i <= lenB; i++) {
    for (let j = 1; j <= lenA; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
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
  const {
    threshold = 0.5 * 100,
    orderBy = null,
    order = null,
    numberOfOutputs = null,
    caseSensitive = false,
    orderSensitive = false,
  } = options;

  // Error handling for missing input strings
  if (!a || !bArray) {
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
    (orderBy && typeof orderBy != "string") ||
    !["similarity", "string"].includes(orderBy)
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

  // Calculate similarity for each string in the array
  let similarities = bArray.map((b) => ({
    Input: b,
    Similarity: b
      ? getSimilarity(a, b, {
          caseSensitive: caseSensitive,
          orderSensitive: orderSensitive,
        })
      : 0,
  }));

  // Filter similarities below threshold
  if (threshold) {
    similarities = similarities.filter(
      ({ Similarity }) => Similarity >= threshold
    );
  } else {
    return [];
  }

  // Sort the filtered similarities based on orderBy and order options
  if (orderBy && order) {
    similarities = similarities.sort((a, b) => {
      if (orderBy === "similarity") {
        return order === "ascending"
          ? a.Similarity - b.Similarity
          : b.Similarity - a.Similarity;
      } else if (orderBy === "string") {
        return order === "ascending"
          ? a.Input.localeCompare(b.Input)
          : b.Input.localeCompare(a.Input);
      }
    });
  }

  // Get the specified number of top similarity results
  if (numberOfOutputs) {
    similarities = similarities.slice(0, numberOfOutputs);
  }
  return similarities;
};

// Export the functions for use in other files
module.exports = { getSimilarity, getSimilarities };
