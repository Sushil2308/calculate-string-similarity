# string-matcher

## Overview
string-matcher is a Node.js package for advanced string matching and comparison. It provides functionality for comparing strings with various options, including case sensitivity and order sensitivity.

## Installation
You can install string-matcher via npm:

```bash
npm install string-matcher

const { matchStrings } = require('string-matcher');

// Example usage:
const similarity = matchStrings("hello", "HELLO");
console.log(similarity); // Output: 100

const similarityWithOptions = matchStrings("hello", "HELLO", { caseSensitive: true, orderSensitive: false });
console.log(similarityWithOptions); // Output: 0
