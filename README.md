# string-matcher

## Overview
string-matcher is a Node.js package for advanced string matching and comparison. It provides functionality for comparing strings with various options, including case sensitivity and order sensitivity.

## Installation
You can install string-matcher via npm:

```bash
npm install string-matcher

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

