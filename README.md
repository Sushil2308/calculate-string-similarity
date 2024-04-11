# calculate-string-similarity

## Overview
calculate-string-similarity is a Node.js package for advanced string matching and comparison. It provides functionality for comparing strings with various options, including case sensitivity and order sensitivity.

## Installation
You can install calculate-string-similarity via npm:

```bash

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

Sure, let's structure the README file for your project to include the use case with examples of how to use the `getSimilarities` function:



```
# String Similarity Calculator

## Overview

This project provides a utility function `getSimilarities` to calculate similarities between a given input string and an array of strings. It can be useful for various applications such as spell correction, autocomplete suggestions, and text analysis.


## Usage

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

## Parameters

- `inputString`: The input string for which similarities need to be calculated.
- `stringList`: An array of strings against which the similarity of the input string will be calculated.
- `options`: An optional object containing additional parameters:
  - `threshold`: The minimum similarity percentage required for a string to be considered similar. Default is `0`.
  - `orderBy`: The parameter to order the results by, either `'similarity'` or `'name'`. Default is `'similarity'`.
  - `order`: The order in which to sort the results, either `'ascending'` or `'descending'`. Default is `'descending'`.
  - `numberOfOutputs`: The number of top similarity results to return. Default is `Infinity`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This README structure provides an overview of the project, installation instructions, usage examples, explanation of parameters, and licensing information. It's a good starting point for users to understand and utilize the String Similarity Calculator package in their projects.

