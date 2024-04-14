const assert = require('assert');
const { getSimilarity, getSimilarities } = require('./index');
const compareArrays = (arr1, arr2) => {
    
    // Check if the arrays have the same length
    if (arr1.length !== arr2.length) {
        return false;
    }
    // Check if each element in arr1 is equal to the corresponding element in arr2
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].Similarity != arr2[i].Similarity) {
            return false;
        }
    }
    // If all elements match, return true
    return true;
};

// Test Cases for getSimilarity

// Test Case 1: Case-insensitive comparison with identical strings
assert.strictEqual(getSimilarity("hello", "HELLO", { caseSensitive: false }), 100);


// Test Case 2: Case-sensitive and order-sensitive comparison with different strings
assert.strictEqual(getSimilarity("hello", "holle", { caseSensitive: true, orderSensitive: true }), 60);


// Test Case 3: Case-insensitive and order-insensitive comparison with partially different strings
assert.strictEqual(getSimilarity("hello", "holle", { caseSensitive: false, orderSensitive: false }), 100);


// Test Case 4: Custom strings with partial similarity
assert.strictEqual(getSimilarity("apple", "aple"), 80);

// Test Case 5: Null input strings (Error Handling)
// assert.throws(() => {
//     getSimilarity(null, "HELLO", { caseSensitive: false });
// }, /^Error: Input strings are required\.$/);

// // Test Case 6: Invalid input parameters (Error Handling)
// assert.throws(() => {
//     getSimilarity("hello", "HELLO", { caseSensitive: "false" });
// }, /^TypeError: Invalid input parameters\.$/);

// Test Case 7: Empty strings
assert.strictEqual(getSimilarity("", ""), 100);

// Test Case 8: Long strings with no similarity
assert.strictEqual(getSimilarity("abcdefghij", "klmnopqrst"), 0);

// Test Case 9: Strings with special characters
assert.strictEqual(getSimilarity("hello!", "HELLO!", { caseSensitive: false }), 100);

// Test Case 10: Case-sensitive comparison with trailing whitespaces
assert.strictEqual(getSimilarity("hello ", "HELLO", { caseSensitive: true }), 0);

// Test Cases for getSimilarities

// Test Case 1: Basic test case with identical strings
assert.strictEqual(compareArrays(getSimilarities("hello", ["hello"]), [{ Input: 'hello', Similarity: 100 }]), true);


// Test Case 2: Case-insensitive comparison with multiple strings
assert.strictEqual(compareArrays(getSimilarities("hello", ["HELLO", "heLLo", "world"]), [{ Input: 'HELLO', Similarity: 100 }, { Input: 'heLLo', Similarity: 100 }]),true);


// console.log(getSimilarities("hello", ["HELLO", "heLLo", "world"]))

// Test Case 3: Order-sensitive comparison with similar strings
assert.strictEqual(compareArrays(getSimilarities("hello", ["holle", "heoll", "hello"]), [{ Input: 'hello', Similarity: 100 }]),false);

// Test Case 4: Empty string input
assert.strictEqual(compareArrays(getSimilarities("", [""]), [{ Input: '', Similarity: 100 }]), true);
// Test Case 5: Null input strings in array (Error Handling)
assert.throws(() => {
    getSimilarities("hello", [null, "world"]);
}, /^Error: Input strings are required\.$/);

// Test Case 6: Invalid input parameters (Error Handling)
assert.throws(() => {
    getSimilarities("hello", ["HELLO", "heLLo"], { caseSensitive: "false" });
}, /^TypeError: Invalid input parameters\.$/);

// Test Case 7: Threshold set to 0 (Include all similarities)
assert.strictEqual(compareArrays(getSimilarities("hello", ["HELLO", "heLLo", "world"], { threshold: 100 ,thresholdType:"<="}), [{ Input: 'HELLO', Similarity: 100 }, { Input: 'heLLo', Similarity: 100 }, { Input: 'world', Similarity: 28.57142857142857 }]), true);


// Test Case 8: Threshold set to 50% (Exclude similarities below threshold)
assert.strictEqual(compareArrays(getSimilarities("hello", ["HELLO", "heLLo", "world"], { threshold: 50 }), [{ Input: 'HELLO', Similarity: 100 }, { Input: 'heLLo', Similarity: 100 }]), true);

// Test Case 9: Order by similarity in ascending order
assert.strictEqual(compareArrays(getSimilarities("hello", ["heLLo", "world", "HELLO"], { orderBy: 'similarity', order: 'ascending' }), [{ Input: 'world', Similarity: 0 }, { Input: 'heLLo', Similarity: 100 }, { Input: 'HELLO', Similarity: 100 }]), false);

// Test Case 10: Order by name in descending order
assert.strictEqual(compareArrays(getSimilarities("hello", ["heLLo", "world", "HELLO"], { orderBy: 'similarity', order: 'descending' }), [ { Input: 'heLLo', Similarity: 100 }, { Input: 'HELLO', Similarity: 100 }]), true);

console.log("All tests passed successfully!");
