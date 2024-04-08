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
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1) // deletion
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

// Export the function for use in other files
module.exports = { getSimilarity };
