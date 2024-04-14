# calculate-string-similarity
The calculate-string-similarity package is designed to provide advanced functionalities for comparing strings in Node.js applications. String matching and comparison are fundamental operations in many software applications, ranging from spell correction to text analysis and beyond. This package aims to simplify and enhance these operations by offering a comprehensive set of features and options.
## Key Features

- **String Matching:** The package offers robust string matching capabilities, allowing developers to compare strings with precision and accuracy.

- **Advanced Comparison:** It goes beyond simple string equality checks and provides options for advanced comparison, including case sensitivity, order sensitivity, and more.

- **Customization:** Developers can customize the comparison process according to their specific requirements. This includes fine-tuning parameters such as case sensitivity and order sensitivity to achieve the desired results.


## Installation
```bash
npm install calculate-string-similarity
```

You can install calculate-string-similarity via npm:

## Features:

## 1. String Similarity Calculator

### Overview

The `calculate-string-similarity` package provides functionality for comparing strings with various options, including case sensitivity and order sensitivity.

```javascript
const { getSimilarity } = require('calculate-string-similarity');

console.log("Test cases for getSimilarity function:");
console.log("----------------------------------------");

// Test case 1: Case-sensitive and order-sensitive comparison with identical strings
console.log("Test case 1:", getSimilarity("hello", "hello")); // Expected output: 100

// Test case 2: Case-insensitive comparison with identical strings
console.log("Test case 2:", getSimilarity("hello", "HELLO", { caseSensitive: false })); // Expected output: 100

// Test case 3: Case-sensitive and order-sensitive comparison with different strings
console.log("Test case 3:", getSimilarity("hello", "holle", { caseSensitive: true, orderSensitive: true })); // Expected output: 60

// Test case 4: Case-insensitive and order-insensitive comparison with partially different strings
console.log("Test case 4:", getSimilarity("hello", "holle", { caseSensitive: false, orderSensitive: false })); // Expected output: 100

// Test case 5: Custom strings with partial similarity
console.log("Test case 5:", getSimilarity("apple", "aple")); // Expected output: 80

// Test case 6: Null input strings
try {
  getSimilarity(null, "HELLO", { caseSensitive: false });
} catch (error) {
  console.log("Test case 6:", error.message); // Expected output: "Input strings are required."
}

// Test case 7: Invalid input parameters
try {
  getSimilarity("hello", "HELLO", { caseSensitive: "false" });
} catch (error) {
  console.log("Test case 7:", error.message); // Expected output: "Invalid input parameters."
}
```

### Parameters

- `string1`: The first string to compare.
- `string2`: The second string to compare.
- `options`: An optional object containing additional parameters:
  - `caseSensitive`: A boolean indicating whether the comparison should be case-sensitive. Default is `true`.
  - `orderSensitive`: A boolean indicating whether the comparison should be order-sensitive. Default is `true`.

## 2. Array String Similarity Calculator

### Overview

This package provides a utility function `getSimilarities` to calculate similarities between a given input string and an array of strings. It can be useful for various applications such as spell correction, autocomplete suggestions, and text analysis.

```javascript
const { getSimilarities } = require('calculate-string-similarity');
const inputString = "apple";
const stringList = ["appl", "apricot", "orange", "banana", "pineapple"];

console.log("Test cases for getSimilarities function:");
console.log("------------------------------------------");

// Test case 8: Case-sensitive and order-sensitive comparison with custom threshold and ordering
console.log("Test case 11:", getSimilarities("apple", ["aple", "banana", "orange"], { caseSensitive: true, orderSensitive: true, threshold: 30, thresholdType: '>=', orderBy: 'similarity', order: 'ascending', numberOfOutputs: 2 }));
// Expected output: [{ Input: 'aple', Similarity: 80 }, { Input: 'banana', Similarity: 0 }]

// Test case 9: Case-insensitive comparison with custom threshold and ordering
console.log("Test case 12:", getSimilarities("apple", ["aple", "banana", "orange"], { caseSensitive: false, threshold: 60, thresholdType: '<=', orderBy: 'string', order: 'descending' }));
// Expected output: [{ Input: 'orange', Similarity: 0 }, { Input: 'aple', Similarity: 80 }]

// Test case 10: Default behavior with order-insensitive comparison and custom threshold
console.log("Test case 13:", getSimilarities("apple", ["aple", "banana", "orange"], { orderSensitive: false, threshold: 70, thresholdType: '>' }));
// Expected output: [{ Input: 'aple', Similarity: 80 }]

// Test case 11: Null input strings
try {
  getSimilarities(null, ["aple", "banana", "orange"], { caseSensitive: false });
} catch (error) {
  console.log("Test case 14:", error.message); // Expected output: "Input strings are required."
}

// Test case 12: Invalid input parameters
try {
  getSimilarities("apple", ["aple", "banana", "orange"], { caseSensitive: "false" });
} catch (error) {
  console.log("Test case 15:", error.message); // Expected output: "Invalid input parameters."
}
// Test case 13: Case-insensitive comparison with custom threshold and ordering
console.log("Test case 12:", getSimilarities("apple", ["aple", "banana", "orange"], { caseSensitive: false, threshold: 60, thresholdType: '<=', orderBy: 'string', order: 'descending' }));
// Expected output: [{ Input: 'orange', Similarity: 0 }, { Input: 'aple', Similarity: 80 }]

// Test case 14: Default behavior with order-insensitive comparison and custom threshold
console.log("Test case 13:", getSimilarities("apple", ["aple", "banana", "orange"], { orderSensitive: false, threshold: 70, thresholdType: '>' }));
// Expected output: [{ Input: 'aple', Similarity: 80 }]

// Test case 15: Null input strings
try {
  getSimilarities(null, ["aple", "banana", "orange"], { caseSensitive: false });
} catch (error) {
  console.log("Test case 14:", error.message); // Expected output: "Input strings are required."
}

// Test case 16: Invalid input parameters
try {
  getSimilarities("apple", ["aple", "banana", "orange"], { caseSensitive: "false" });
} catch (error) {
  console.log("Test case 15:", error.message); // Expected output: "Invalid input parameters."
}
```

### Parameters

- `inputString`: The input string for which similarities need to be calculated.
- `stringList`: An array of strings against which the similarity of the input string will be calculated.
- `options`: An optional object containing additional parameters:
  - `threshold`: The minimum similarity percentage required for a string to be considered similar. Default is `0`.
  - `thresholdType`: The type of threshold comparison to be applied for similarity percentage. It determines whether the similarity percentage should be greater than (`>`), greater than or equal to (`>=`), less than (`<`), or less than or equal to (`<=`) the specified threshold value. Default is `>`.
  - `orderBy`: The parameter to order the results by, either `'similarity'` or `'name'`. Default is `'similarity'`.
  - `order`: The order in which to sort the results, either `'ascending'` or `'descending'`. Default is `'descending'`.
  - `numberOfOutputs`: The number of top similarity results to return. Default is `Infinity`.
```