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

## String Similarity Calculator

### Overview

The `calculate-string-similarity` package provides functionality for comparing strings with various options, including case sensitivity and order sensitivity.

```javascript
const { getSimilarity } = require('calculate-string-similarity');

// Example 1: Case-insensitive comparison
const similarity1 = getSimilarity("hello", "HELLO", { caseSensitive: false });
console.log("Similarity (case-insensitive):", similarity1); // Output: Similarity (case-insensitive): 100

// Example 2: Case-sensitive and order-sensitive comparison
const similarity2 = getSimilarity("hello", "holle", { caseSensitive: true, orderSensitive: true });
console.log("Similarity (case-sensitive, order-sensitive):", similarity2); // Output: Similarity (case-sensitive, order-sensitive): 60

// Example 3: Case-insensitive and order-insensitive comparison
const similarity3 = getSimilarity("hello", "holle", { caseSensitive: false, orderSensitive: false });
console.log("Similarity (case-insensitive, order-insensitive):", similarity3); // Output: Similarity (case-insensitive, order-insensitive): 100

// Example 4: Custom strings
const similarity4 = getSimilarity("apple", "aple");
console.log("Similarity:", similarity4); // Output: Similarity: 80
```

### Parameters

- `string1`: The first string to compare.
- `string2`: The second string to compare.
- `options`: An optional object containing additional parameters:
  - `caseSensitive`: A boolean indicating whether the comparison should be case-sensitive. Default is `true`.
  - `orderSensitive`: A boolean indicating whether the comparison should be order-sensitive. Default is `true`.

## Array String Similarity Calculator

### Overview

This package provides a utility function `getSimilarities` to calculate similarities between a given input string and an array of strings. It can be useful for various applications such as spell correction, autocomplete suggestions, and text analysis.

```javascript
const { getSimilarities } = require('string-similarity-calculator');
const inputString = "apple";
const stringList = ["appl", "apricot", "orange", "banana", "pineapple"];

// Example 1: Get top 3 similar strings with similarity percentage above 50% and order by similarity in descending order
const similarities1 = getSimilarities(inputString, stringList, { threshold: 50, orderBy: 'similarity', order: 'descending', numberOfOutputs: 3 });
console.log("Top 3 similar strings (ordered by similarity percentage in descending order):", similarities1);

// Example 2: Get top 2 similar strings with similarity percentage above 60% and order by string name in ascending order
const similarities2 = getSimilarities(inputString, stringList, { threshold: 60, orderBy: 'name', order: 'ascending', numberOfOutputs: 2 });
console.log("Top 2 similar strings (ordered by string name in ascending order):", similarities2);

// Example 3: Get all similar strings with similarity percentage above 40% and order by similarity in descending order
const similarities3 = getSimilarities(inputString, stringList, { threshold: 40, orderBy: 'similarity', order: 'descending' });
console.log("All similar strings (ordered by similarity percentage in descending order):", similarities3);
```

### Parameters

- `inputString`: The input string for which similarities need to be calculated.
- `stringList`: An array of strings against which the similarity of the input string will be calculated.
- `options`: An optional object containing additional parameters:
  - `threshold`: The minimum similarity percentage required for a string to be considered similar. Default is `0`.
  - `orderBy`: The parameter to order the results by, either `'similarity'` or `'name'`. Default is `'similarity'`.
  - `order`: The order in which to sort the results, either `'ascending'` or `'descending'`. Default is `'descending'`.
  - `numberOfOutputs`: The number of top similarity results to return. Default is `Infinity`.
```