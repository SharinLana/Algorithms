// ! PROBLEM 1:
// Write a function which takes in a string
// and returns counts of each character in the string.

function countCharts(str) {
  //create an empty object
  let counter = {};

  str.split("").map((char) => {
    if (char.match(/[a-zA-Z0-9]/)) {
      counter[char] ? (counter[char] += 1) : (counter[char.toLowerCase()] = 1);
    }
  });

  //return an object filled with the keys equal to the letter names and values equal their numbers
  return counter;
}

console.log(countCharts("Hello world, hi!"));

// ! PROBLEM 2. (Frequency Counter)
// Write a function which accepts 2 arrays.
// The function should return true if every value in the first array
// has its corresponding value squared in the second array.
// The frequency of values must be the same.

function same(arr1, arr2) {
  // 1. If the length os the arrays s different, return false
  if (arr1.length !== arr2.length) {
    return false;
  }

  // 2. create 2 empty objects
  let obj1 = {};
  let obj2 = {};

  // 3. Loop through each of the arrays and count the numbers of the array elements
  // DO NOT MAKE A NESTED LOOP AS ITS BIG O(n^2)!!!
  // IT'S ALWAYS BETTER TO USE OBJECTS TO COUNT FREQUENCY AS THEIR BIG 0(N)
  for (let elem of arr1) {
    obj1[elem] ? obj1[elem]++ : (obj1[elem] = 1);
  }
  for (let elem of arr2) {
    obj2[elem] ? obj2[elem]++ : (obj2[elem] = 1);
  }

  // 4. Compare the keys and values of the objects
  for (let key in obj1) {
    // 4a) Comparing keys
    if (!(key ** 2 in obj2)) {
      return false;
    }
    // 4b) Comparing values
    if (obj2[key ** 2] !== obj1[key]) {
      return false;
    }
  }

  return true;
}

console.log(same([1, 2, 3, 4], [1, 4, 9, 16])); // true

// {1: 1, 2: 1, 3: 1, 4: 1}
// {1: 1, 4: 1, 9: 1, 16: 1}

// ! PROBLEM 3. (Frequency Counter)
// Given 2 strings.
// Write a function to determine if the second string
// is an anagram of the first (e.g. "cinema" - "iceman");

function isAnagram(str1, str2) {
  // 1. Compare the length of the strings.
  // If they are different, return false
  if (str1.length !== str2.length) {
    return false;
  }

  // 2. Create an empty object
  let obj = {};

  // 3. Fill the object: character = key, number of the characters = value
  for (let char of str1) {
    obj[char] ? obj[char]++ : (obj[char] = 1);
  }

  // 4. Compare the obj keys to the second string chars.
  // If they are not the same, return fasle
  for (let char of str2) {
    // If obj key does not equal to one of the characters of the str2, return false
    if (!(char in obj)) {
      return false;
    } else {
      // If the obj contains the char as a key, substruct 1
      // (all values eventually have to become 0)
      obj[char] -= 1;
    }
  }
  return true;
}

console.log(isAnagram("anagram", "nagaram")); // true

// ! OPTIONAL CHALLENGE. Frequency Counter - sameFrequency
// Write a function called sameFrequency.
//  Given two positive integers, find out
// if the two numbers have the same digits and frequency of digits.
// INPUT EXAMLES:
// sameFrequency(182,281) // true
// sameFrequency(34,14) // false
// sameFrequency(3589578, 5879385) // true
// sameFrequency(22,222) // false

function sameFrequency(num1, num2) {
  // * 1. Convert the numbers to arrays
  let str1 = num1.toString().split("");
  let str2 = num2.toString().split("");

  // * 2. If the length of these arrays are different, return false
  if (str1.length !== str2.length) {
    return false;
  }

  // * 3. Check if the first array contains the very same elements
  // * as the second one, and if it doesn't, return false
  for (let i = 0; i < str2.length; i++) {
    if (!str1.includes(str2[i])) {
      return false;
    }
  }
  // * 4. Otherwise, return true
  return true;
}
console.log(sameFrequency(22, 222)); // false
console.log(sameFrequency(182, 281)); // true

// ! OPTIONAL CHALLENGE. Frequency Counter
/* Implement a function called, areThereDuplicates 
which accepts a variable number of arguments, 
and checks whether there are any duplicates among the arguments passed in.  
You can solve this using the frequency counter pattern 
OR the multiple pointers pattern.

INPUT EXAMPLES:
areThereDuplicates(1, 2, 3) // false
areThereDuplicates(1, 2, 2) // true 
areThereDuplicates('a', 'b', 'c', 'a') // true 
*/

function areThereDuplicates(...args) {
  // * 1. Create an empty object
  // * which will take in each argument as a key and its counter as a value
  let obj = {};

  // * 2. Loop through the array of arguments
  // * putting each value to the object as a key
  for (let elem of args) {
    // * 3. If the object doesn't have such value, count it as 1.
    // * And add + 1 each time when there is a duplicate
    obj[elem] === undefined ? (obj[elem] = 1) : (obj[elem] += 1);

    // * 4. Return true if the values in the object bigger than 1
    if (obj[elem] > 1) {
      return true;
    }
  }

  return false;
}
console.log(areThereDuplicates(1, 2, 2)); // true
console.log(areThereDuplicates(1, 2, 3)); // false

// ! PROBLEM 3. (Multiple Pointers Pattern)
// Write a function which accepts a SORTED array of integers.
// The function should find the FIRST pair where the sum is 0.
// Return an array that includes both values that sum to zero
// or "undefined" if the pair does not exist.

// EXAMPLES OF THE OUTPUT:
// sumZero([-3, -2, -1, 0, 1, 2, 3]); // [-3, 3]
// sumZero([-2, 0, 1, 3]); // undefined
//sumZero([-1, 0, 1, 2, 3]); // undefined

function sumZero(arr) {
  // 1. Define the pointers
  let left = 0;
  let right = arr.length - 1;

  // 2. Define the condition
  while (left < right) {
    // not <= but  just < because we don't need 0 to be summed up to itself as -0 + 0 = 0
    // 3. Implement addition
    let sum = arr[left] + arr[right];

    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
  return undefined;
}

console.log(sumZero([-3, -2, -1, 0, 1, 2, 3])); // (2) [-3, 3]
console.log(sumZero([-2, 0, 1, 3])); // undefined
console.log(sumZero([-1, 0, 1, 2, 3])); // [-1, 1]

// ! PROBLEM 4. (Multiple Pointers Solution)
// Implement a function which accepts a sorted array
// and counts the unique values in the array.
// There can be negative numbers in the array but they always be sorted.

function countUniqueValues(arr) {
  if (arr.length === 0) return 0;

  let newArr = [];
  let i = 0;

  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return newArr;
}

console.log(countUniqueValues([-2, -2, -2, -2, -1, -1, -1, 0, 1]));

// ALTERNATIVE (MY OWN) APPROACH
function mySolutionToCountUniqueValues(arr) {
  if (arr.length === 0) return 0;

  let newArr = [];

  for (let elem of arr) {
    if (!newArr.includes(elem)) {
      newArr.push(elem);
    }
  }
  return newArr.length;
}

console.log(mySolutionToCountUniqueValues([-2, -1, -1, 0, 1])); // 4

// ! OPTIONAL CHALLENGE
/*
Given an array of random numbers, 
Push all the zeros of a given array to the end of the array. 
For example, if the given arrays is {1, 9, 8, 4, 0, 0, 2, 7, 0, 6, 0}, 
it should be changed to {1, 9, 8, 4, 2, 7, 6, 0, 0, 0, 0}. 
The order of all other elements should be same. 
Expected time complexity is O(n) and extra space is O(1).
*/

// * My personal solution 😃
const pushZerosToEnd = (arr) => {
  let count = 0; // count zero elements

  //   Loop through the array
  for (let i = 0; i < arr.length; i++) {
    // If the element = 0, remove it fron the array,
    // increase the counter by 1,
    // and make a step back
    // (it's nesessary for the cases when we have multiple zeros in a row in the array)
    // If we don't make a step back, they will be overlooked by the loop
    // because their index will change after removing zero in front of them
    if (arr[i] === 0) {
      arr.splice(i, 1);
      count++;
      i--;
    }
  }

  // then count the collected zeros and push them at the end of the array
  for (let i = 0; i < count; i++) {
    arr.push(0);
  }
  return arr;
};

console.log(pushZerosToEnd([1, 9, 8, 4, 0, 0, 2, 7, 0, 6, 0, 9])); // [1 9 8 4 2 7 6 9 0 0 0 0 ]

// ! OPTIONAL CHALLENGE. Multiple Pointers - averagePair
// Write a function called averagePair.
// Given a sorted array of integers and a target average,
// determine if there is a pair of values in the array
// where the average of the pair equals the target average.
// There may be more than one pair that matches the average target.

// INPUT EXAMPLES:
// averagePair([1,2,3],2.5) // true
// averagePair([1,3,3,5,6,7,10,12,19],8) // true
// averagePair([-1,0,3,4,5,6], 4.1) // false
// averagePair([],4) // false

function averagePair(arr, num) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let avg = (arr[left] + arr[right]) / 2;

    if (avg === num) {
      return true;
    } else if (avg > num) {
      right--;
    } else {
      left++;
    }
  }

  return false;
}

console.log(averagePair([1, 2, 3], 2.5)); // true
console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false

// ! OPTIONAL CHALLENGE. Multiple Pointers - isSubsequence
// Write a function called isSubsequence
// which takes in two strings and checks whether the characters in the first string
// form a subsequence of the characters in the second string.
// In other words, the function should check whether the characters in the first string
// appear somewhere in the second string, without their order changing.

// EXAMPLES:
// isSubsequence('hello', 'hello world'); // true
// isSubsequence('sing', 'sting'); // true
// isSubsequence('abc', 'abracadabra'); // true
// isSubsequence('abc', 'acb'); // false (order matters)

function isSubsequence(str1, str2) {
  // The idea is to loop through str2 and check how many matches we can get
  // And then compare the str1 length to the count value.

  // Create a counter
  let count = 0;
  for (let char of str2) {
    if (str1[count] === char) {
      // During the first round, we are checking if there is a in abracadabra
      count++;
      // If the match exists, we increase the counter value
      // and after that str1[count] = str1[1] = 'b', so we are checking again
    }
  }
  return str1.length === count;
}

console.log(isSubsequence("abc", "acb")); // false
console.log(isSubsequence("sing", "sting")); // true

// ! SLIDING WINDOW PATTERN
/* This pattern involves creating a WINDOW which can either be an array or number.
Depending o a certain condition, 
the window either increases or closes (and a new window is created) 
Very useful for keeping track of a subset of data in an array/string etc. */

// PROBLEM 5. (Sliding Window Pattern)
// Write a function which accepts an array of integers and a number called n.
// The function should calculate the maximum sum of n consequtive elements in the array.
// EXAMPLES:
// maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2); // 10
// maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4); // 17
// maxSubarraySum([4, 2, 1, 6], 1); // 6
// maxSubarraySum([4, 2, 1, 6, 2], 4); // 13
// maxSubarraySum([], 4); // null

function maxSubarraySum(arr, n) {
  // * 1. If the arr length is less than n, return null
  if (arr.length < n) return null;

  // * 2. Create 2 variables: the first is for the maxSum
  // * the second - to store a temporary result.
  let maxSum = 0;
  let tempSum = 0;

  // * 3. Loop through the first n numbers of the array
  // * and store their sum in maxSum:
  for (let i = 0; i < n; i++) {
    maxSum += arr[i]; // 10
  }
  // * 4. Make the tempSum be equal to the maxSum
  // * We need it for the following compare and extracting the maximum sum;
  tempSum = maxSum; // 10

  // * 5. Loop through the REST of the array
  // *  substracting from the tempSum the previous first number
  // * and adding the next number in the raw.
  for (let i = n; i < arr.length; i++) {
    // indexes: 4, 5, 6

    tempSum = tempSum - arr[i - n] + arr[i];
    // What happens during the iterations:
    // tempSum = 10 - 1 (arr[4 - 4]) + 8 (arr[4]) = 17;
    // tempSum = 17 - 2 (arr[5 - 4]) + 1 (arr[5]) = 16;
    // tempSum = 10 - 5 (arr[6 - 4]) + 5 (arr[6]) = 10;

    // * Maximum sum is the biggest of these two.
    maxSum = Math.max(maxSum, tempSum);
  }

  return maxSum;
}
maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4); // 17

// ! OPTIONAL CHALLENGE. Sliding Window - maxSubarraySum
// Given an array of integers and a number,
// write a function, which finds the maximum sum of a subarray
// with the length of the number passed to the function.

// Note that a subarray must consist of consecutive elements
// from the original array.
// In the first example below, [100, 200, 300] is a subarray of the original array,
// but [100, 300] is not.

// EXAMPLES:
// maxSubarraySum([100,200,300,400], 2) // 700
// maxSubarraySum([1,4,2,10,23,3,1,0,20], 4)  // 39
// maxSubarraySum([-3,4,0,-2,6,-1], 2) // 5
// maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2) // 5
// maxSubarraySum([2,3], 3) // null

function maxSubarrSum(arr, num) {
  if (arr.length < num) return null;

  let maxSum = 0;
  let tempSum = 0;

  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }

  tempSum = maxSum;

  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }

  return maxSum;
}

console.log(maxSubarrSum([100, 200, 300, 400], 2)); // 700

// ! OPTIONAL CHALLENGE. Sliding Window - minSubArrayLen
// Write a function called minSubArrayLen
// which accepts two parameters - an array of positive integers
// and a positive integer.

// This function should return the minimal length of a contiguous subarray
// of which the sum is greater than or equal to the integer
// passed to the function. If there isn't one, return 0 instead.

// EXAMPLES:
// minSubArrayLen([2,3,1,2,4,3], 7) // 2 -> because [4,3] is the smallest subarray
// minSubArrayLen([2,1,6,5,4], 9) // 2 -> because [5,4] is the smallest subarray
// minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) // 1 -> because [62] is greater than 52
// minSubArrayLen([1,4,16,22,5,7,8,9,10],39) // 3
// minSubArrayLen([1,4,16,22,5,7,8,9,10],55) // 5
// minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11) // 2
// minSubArrayLen([1,4,16,22,5,7,8,9,10],95) // 0

function minSubArrayLen(arr, num) {
  // * 1. Define the sum and starting index for the input array
  let sum = 0;
  let i = 0;

  // * 2. Create 2 empty arrays.
  // * The "tempArray" is needed for storing the numbers, which sum is bigger or equal to the input number.
  // * The "arrayLengths" will store the length of the tempArray after the end of each cycle of iterations
  let arrayLengths = [];
  let tempArray = [];

  // * 3. Loop through the input array..
  while (sum < num && i < arr.length) {
    // * 3a) ...and sum the elements of the input array as long as the sum is less than the input number.
    sum += arr[i];
    // * 3b) Push these elements to the "tempArray"
    tempArray.push(arr[i]);
    // * 3c) and increase the index with each iteration
    i++;

    // * 4. When the "tempArray" is filled out,
    // * reset the 'sum', 'index', and remove the first element from the input array as we don't need it anymore.
    // * After that, push the length of the "tempArray" to the "arrayLength".
    // * Reset "tempArray" for the next cycle of iterations.
    if (sum >= num) {
      sum = 0;
      i = 0;
      arr.splice(0, 1);
      arrayLengths.push(tempArray.length);
      tempArray = [];
    }
  }

  // * 5. Sort the elements of the "arrayLengths" from lowest to highest
  arrayLengths.sort();

  // * 6. Return 0 if the "arrayLengths" is empty
  if (arrayLengths.length === 0) {
    return 0;
  }

  // * 7. After sorting the elements of the "arrayLengths", the first element is the lowest.
  // * Exactly what we need to return.
  return arrayLengths[0];
}
console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)); // 0
console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)); // 2

// ! OPTIONAL CHALLENGE. Sliding Window - findLongestSubstring
// Write a function called findLongestSubstring,
// which accepts a string and returns the length of the longest substring
// with all distinct characters.

// EXAMPLES:
// findLongestSubstring('') // 0
// findLongestSubstring('rithmschool') // 7
// findLongestSubstring('thisisawesome') // 6
// findLongestSubstring('thecatinthehat') // 7
// findLongestSubstring('bbbbbb') // 1
// findLongestSubstring('longestsubstring') // 8
// findLongestSubstring('thisishowwedoit') // 6

function findLongestSubstring(str) {
  // first checking the longest substring of the unique chars in "longestsubstring"
  // then - in "ongestsubstring"
  // then - in "ngestsubstring"
  // then - in "gestsubstring" etc

  let array = str.split("");
  let i = 0;
  let uniqueChars = [];
  let length = [];

  while (i < array.length) {
    uniqueChars.push(array[i]); // adding the unique chars to the array
    i++;

    // In case of meeting a duplicate, we reset everything,
    // remove the first chart of the string and start the loop over
    if (uniqueChars.includes(array[i])) {
      length.push(i);
      i = 0;
      uniqueChars = [];
      array.splice(0, 1);
    }
  }

  // Calculating the longest length (the largest number).
  return Math.max(...length, uniqueChars.length);
}
console.log(findLongestSubstring("longestsubstring")); // 8
console.log(findLongestSubstring("thisishowwedoit")); // 6

// ! DIVIDE AND CONQUER PATTERN
// Dividing a data set into smaller chunks
// and then repeating a process with a subset of data.
// This pattern can tremendously decrease time complexity.
// ! NOTE: The data has to be sorted!

// Take a middle value and compare it to the input number.
// If it's smaller than the input,
// check the middle value of another chunck, and so on
// until a match is found
// * EXAMPLE: check if this arr contains number 13.
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
// fisrt middle: 8. It's smaller, than 13. So, keep looking starting from 8 and up.
//  middle of the 8 - 16 chunck: 12. It's still smaller then 13. Find another middle
//  middle of the 12 - 16 chunck: 14. It's bigger than 13. Find a middle between 12 and 14.
// middle of the 12 - 14 chinck: 13. Gotcha!!!

// PROBLEM 6.
// Find the index of the num in the given array of sorted integers.
function findIndex(arr, num) {
  // * 1. Make the index pointers for the beginning and end of the array
  let startPointIndex = 0;
  let endPointIndex = arr.length - 1;

  for (let i = startPointIndex; i <= endPointIndex; i++) {
    // * 2. Loop through the index numbers and define the middle index
    let middleIndex = Math.floor((startPointIndex + endPointIndex) / 2);

    // * 3. If the array element with this index is smaller than num
    // * make it the startPointIndex
    if (arr[middleIndex] < num) {
      startPointIndex = middleIndex;
    } else if (arr[middleIndex] > num) {
      // * 4. If the array element with this index is bigger than num
      // * make it the endPointIndex
      endPointIndex = middleIndex;
    } else {
      // * 5. Otherwise, return the middle index...
      return middleIndex;
    }
  }
  // * ... or -1, if the number with such index does not exist in the array
  return -1;
}
// ! The complexity of this solution is log(n), which is great.
console.log(findIndex([18, 19, 20, 21, 22, 23, 24], 22)); // 4

// ! RECURSIVE FUNCTIONS 

// ! FOR ARRAYS, use methods like slice, the spread operator and concat
// ! that make copies of arrays so you do not mutate them

// ! FOR STRINGS (which are immutable) - slice, substr, substring() methods
// ! to make copies of string

// ! FOR OBJECTS - Object.assign or the spread operator

// * 2 essential parts of a recursive function:
// ** Base Case (the condition where the function ends)
// ** Different input

// ! EXAMPLE 1: Countdown recursion function
function countDown(num) {
  // base case: when the function has to stop calling itself
  if (num <= 0) {
    console.log("All done!");
    return;
  }

  // Different input each time we invoke the function
  console.log(num);
  num--;
  countDown(num);
}

countDown(3);
// print 3;
// 3 - 1 = 2;
// print 2;
// 2 - 1 = 1;
// print 1;
// 1 - 1 = 0
// num = 0. Stop here.

// ! EXAMPLE 2: Addition recursion function

function sumRange(num) {
  if (num === 1) return 1;

  return num + sumRange(num - 1);
}
console.log(sumRange(3)); // 6
// 1st iteration of the call stack:
// * return 3 + sumRange(2);
// 2nd iteration:
//            * return 2 + sumRange(1);
// 3rd iteration:
//                       * return 1;

// ! EXAMPLE 3: Factorial recursively
// 4! = 4 * 3 * 2 * 1
function factorial(num) {
  if (num === 1) return 1; //not 0, because if we multiply the final result by 0, it will eliminate the calculation

  return num * factorial(num - 1);
}
console.log(factorial(4)); // 24

// ! EXAMPLE 4: Helper recursion
function collectOddValues(arr) {
  let oddNumbers = [];

  // * Recursive function
  function helper(helperInput) {
    // Base case
    if (helperInput.length === 0) return;
    // Doing stuff
    if (helperInput[0] % 2 !== 0) {
      oddNumbers.push(helperInput[0]);
    }
    // Updating the input
    helper(helperInput.slice(1));
  }

  // * Calling the fucntion (otherwise it won't work)
  helper(arr);

  return oddNumbers;
}
console.log(collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9])); // (5) [1, 3, 5, 7, 9]

// ! EXAMPLE 5: Pure recursion (same function as it was in EXAMPLE 4)
function getOddValues(arr) {
  // * This array will be reset to empty each time this func calls recursively.
  let result = [];

  if (arr.length === 0) return result;

  if (arr[0] % 2 !== 0) {
    result.push(arr[0]);
  }

  // * That's why here we concatenate the result of the first iteration
  // * to the results of the function with the updated input:
  result = result.concat(getOddValues(arr.slice(1)));
  // [1].concat(getOddValues([2, 3, 4, 5]));
  //      [].concat(getOddValues([3, 4, 5]));
  //          [3].concat(getOddValues([4, 5]));
  //              [].concat(getOddValues([5]));
  //                  [5].concat(getOddValues([]));
  //                      []
  return result;
}
console.log(getOddValues([1, 2, 3, 4, 5])); // (3) [1, 3, 5]

// ! OPTIONAL CHALLENGE - Power
// Write a function called power which accepts a base and an exponent.
// The function should return the power of the base to the exponent.
// Do NOT use **!
// This function should mimic the functionality of Math.pow()  -
// do not worry about negative bases and exponents.
// EXAMPLES:
// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16

function power(num, exponent) {
  return exponent === 0 ? 1 : num * power(num, exponent - 1);
}
// 2 * power(2, 3) = 2 * 8
//   2 * power (2, 2) = 2 * 4 = 8
//      2 * power(2, 1) = 2 * 2 = 4
//        2 * power(2, 0) = 2 * 1 = 2
//          1

console.log(power(2, 4));

// ! OPTIONAL CHALLENGE - factorial
// Write a function factorial which accepts a number
// and returns the factorial of that number.
// A factorial is the product of an integer and all the integers below it;
// e.g., factorial four ( 4! ) is equal to 24,
// because 4 * 3 * 2 * 1 equals 24.
// factorial zero (0!) is always 1.
// EXAMPLES:
//factorial(1) // 1
// factorial(2) // 2
// factorial(4) // 24
// factorial(7) // 5040

const calculateFactorial = (num) => {
  return num === 0 ? 1 : num * calculateFactorial(num - 1);
};

console.log(calculateFactorial(7)); // 5040

// ! OPTIONAL CHALLENGE - productOfArray
// Write a function called productOfArray
// which takes in an array of numbers and returns the product of them all.
// EXAMPLES
// productOfArray([1,2,3]) // 6
// productOfArray([1,2,3,10]) // 60
const productOfArray = (arr) => {
  let product = 1;

  function helper(helperInput) {
    if (helperInput.length === 0) return 1;
    product *= helperInput[0];
    helper(helperInput.slice(1));
  }
  helper(arr);

  return product;
};

console.log(productOfArray([1, 2, 3, 10])); // 60

// ! productOfArray - ALTERNATIVE
const getProduct = (arr) => {
  if (!arr.length) return 1;
  return arr[0] * getProduct(arr.slice(1));
};

console.log(productOfArray([1, 2, 3, 4])); // 24

// ! OPTIONAL CHALLENGE - recursiveRange
// Write a function called recursiveRange
// which accepts a number and adds up all the numbers
//  from 0 to the number passed to the function
// EXAMPLES
// recursiveRange(6) // 21
// recursiveRange(10) // 55

const recursiveRange = (num) => {
  let sum = 0;

  function helper(helperInput) {
    if (helperInput === 0) return 0;
    sum += helperInput;
    helper(helperInput - 1);
  }

  helper(num);
  return sum;
};

console.log(recursiveRange(6)); // 21

// ! recursiveRange - ALTERNATIVE
const recursiveRange2 = (num) => {
  if (num === 0) return 0;
  return (num += recursiveRange(num - 1));
};

console.log(recursiveRange2(10)); // 55

// ! OPTIONAL CHALLENGE - fib
// Write a recursive function called fib which accepts a number
// and returns the nth number (poryadkoviy nomer) in the Fibonacci sequence.
// * [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...]
// EXAMPLES
// fib(4) // 3 (if poryadkoviy nomer = 4, then it's Fibonacci's 3)
// fib(10) // 55 (55 is under the poryadkovim nomerom 10)
// fib(28) // 317811
// fib(35) // 9227465

function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
  //            1   +   1
  // eventually all funcs that not automatically return 1, should be destructured to the func(2) = 1
}
console.log(fib(4)); // 3
// so when you run fib(4) it returns fib(3) +fib(2).
// fib(2) immediately returns 1, so we've got fib(3)+1.
// fib (3) breaks down to fib(2) + fib(1).
// So now we've got fib(2)+(1)+1.
// Which translates to 1+1+1=3.

// ! OPTIONAL CHALLENGE - reverse
// Write a recursive function called reverse
// which accepts a string and returns a new string in reverse.
// EXAMPLES:
// reverse('awesome') // 'emosewa'
// reverse('rithmschool') // 'loohcsmhtir'

function reverse(str) {
  // * APPROACH 1
  // The result will be stored in the array
  let arr = [];
  // Base case
  if (str.length === 0) return;
  // Push the very last charachter to the arr
  arr.push(str[str.length - 1]);
  // As far as arr will be emptied with every new iteration,
  // We have to prevent this by using concat() that includes a recursive function
  // with the updated input
  // (we throw away the very last char and start over with the shortened array)
  arr = arr.concat(reverse(str.substring(0, str.length - 1)));
  // Return the reversed string
  return arr.join("");

  // * APPROACH 2
  return str.length === 0
    ? ""
    : str.slice(-1).concat(reverse(str.substring(0, str.length - 1)));
}
console.log(reverse("awesome")); // emosewa
console.log(reverse("rithmschool")); // loohcsmhtir

// ! OPTIONAL CHALLENGE - isPalindrome
// Write a recursive function called isPalindrome
// which returns true if the string passed to it is a palindrome
// (reads the same forward and backward). Otherwise it returns false.
// EXAMPLES:
// isPalindrome('awesome') // false
// isPalindrome('foobar') // false
// isPalindrome('tacocat') // true
// isPalindrome('amanaplanacanalpanama') // true
// isPalindrome('amanaplanacanalpandemonium') // false

function isPalindrome(str) {
  let arr = str.split("");

  // Helper function
  // If the first element of arr === the last char of the string,
  // then remove the first element from the arr
  // and start over with the updated input (reduced string)
  function helper(helperInput) {
    if (helperInput.length === 0) return;

    if (arr[0] === helperInput[helperInput.length - 1]) {
      arr.shift();
      helper(helperInput.substring(0, helperInput.length - 1));
    }
  }
  helper(str);

  // If there are no elems in the arr, then it's a palindrome
  return arr.length === 0 ? true : false;
}
console.log(isPalindrome("tacocat")); // true
console.log(isPalindrome("foobar")); // false

// ! OPTIONAL CHALLENGE - someRecursive
// Write a recursive function called someRecursive
// which accepts an array and a callback.
// The function returns true
// if a single value in the array returns true
// when passed to the callback.
// Otherwise it returns false.
// EXAMPLES:
// const isOdd = val => val % 2 !== 0;

// someRecursive([1,2,3,4], isOdd) // true (because 1 and 3 are odd)
// someRecursive([4,6,8,9], isOdd) // true (because 9 is odd)
// someRecursive([4,6,8], isOdd) // false (no odd numbers)
// someRecursive([4,6,8], val => val > 10); // false (all numbers atr lower that 10)

const isOdd = (val) => val % 2 !== 0;

function someRecursive(arr, callback) {
  if (arr.length === 0) return false;

  if (callback(arr[0])) {
    return true;
  }
  return someRecursive(arr.slice(1), callback);
}

console.log(someRecursive([1, 2, 3, 4], isOdd)); // true
console.log(someRecursive([4, 6, 8], (val) => val > 10)); // false
console.log(someRecursive([4, 6, 8], isOdd)); // false

// ! OPTIONAL CHALLENGE - flatten
// Write a recursive function called flatten which accepts an array of arrays
// and returns a new array with all values flattened.
// EXAMPLES:
// flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
// flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
// flatten([[1],[2],[3]]) // [1,2,3]
// flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3]

function flatten(arr) {
  const newArray = arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      acc = acc.concat(flatten(item));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  return newArray;
}
console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1, 2, 3]

// ! OPTIONAL CHALLENGE - capitalizeFirst
// Write a recursive function called capitalizeFirst. Given an array of strings,
// capitalize the first letter of each string in the array.
// EXAMPLES:
// capitalizeFirst(['car','taco','banana']); // ['Car','Taco','Banana']

function capitalizeFirst(arr) {
  let newArr = [];

  // Return the newly created array if the arr length is 0
  if (arr.length === 0) return newArr;

  // Extract the first element from the arr
  // and capitalize its first letter
  const capitalized = arr[0][0].toUpperCase() + arr[0].slice(1);
  // Push it to the newArr
  newArr.push(capitalized);
  // Concat the previous result with the next one
  newArr = newArr.concat(capitalizeFirst(arr.slice(1)));

  return newArr;
}
console.log(capitalizeFirst(["car", "taco", "banana"])); //  ['Car', 'Taco', 'Banana']

// ! OPTIONAL CHALLENGE - nestedEvenSum
// Return the sum of all even numbers in an object
// which may contain nested objects.
let obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup",
    },
  },
};

let obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: "ball", ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: "car" },
};

function nestedEvenSum(obj) {
  // The idea is to use a helper recursive function to collect and add the result
  // of each iteration.
  let result = 0;

  function helper(helperInput) {
    // Getting the values of the object
    const sum = Object.values(helperInput).reduce((acc, item) => {
      // If it's still an object, then run the recursive function again
      if (typeof item === "object") {
        helper(item);
      } else {
        // If it's not an object but a number that is even,
        // then add it to the accumulator
        if (item % 2 === 0) {
          acc += item;
        }
      }
      // And return it.
      return acc;
    }, 0); // <= sum

    // With each iteration, the acc value will be returned back to 0.
    // That's why we need to collect the returned value of each iteration
    // of the helper function
    // and add it to the external variable.
    result += sum;
    // return sum; // we don't even need to return anything here
  }

  helper(obj);
  return result;
}

console.log(nestedEvenSum(obj1)); // 6
console.log(nestedEvenSum(obj2)); // 10

// ! OPTIONAL CHALLENGE - capitalizeWords
// Write a recursive function called capitalizeWords. Given an array of words,
// return a new array containing each word capitalized.
// EXAMPLES:
// let words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
let words = ["i", "am", "learning", "recursion"];

const capitalizeWords = (arr) => {
  let newArr = [];

  if (arr.length === 0) return newArr;

  newArr.push(arr[0].toUpperCase());
  newArr = newArr.concat(capitalizeWords(arr.slice(1)));
  return newArr;
};

console.log(capitalizeWords(words)); // ['I', 'AM', 'LEARNING', 'RECURSION']

// ! OPTIONAL CHALLENGE - stringifyNumbers
// Write a function called stringifyNumbers
// which takes in an object and finds all of the values which are numbers
// and converts them to strings.
// EXAMPLE:

// INITIAL OBJECT:

let object = {
  num: 1,
  test: [],
  data: {
    val: 4,
    info: {
      isRight: true,
      random: 66,
    },
  },
};

/*
stringifyNumbers(obj)

RESULT:
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/

const stringifyNumbers = (obj) => {
  var newObj = {};

  for (var key in obj) {
    if (typeof obj[key] === "number") {
      newObj[key] = obj[key].toString();
    } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      newObj[key] = stringifyNumbers(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;

  // ALTERNATIVE SOLUTION (USING SPREAD OPERATOR)

  // const key = Object.keys(obj)[0]; // * get the very first obj key
  // const { [key]: val, ...left } = obj; // * define the first pair key-value and spread the rest

  // if (typeof val === 'number') {
  //   obj[key] = val.toString(); // * stringify the value
  // } else if (typeof val === 'object') {
  //   obj[key] = stringifyNumbers(val); // * start new iteration
  // }

  // return {
  //   ...obj, // * the main tricks
  //   ...stringifyNumbers(left), // * and magic 😁
  // };
};

console.log(stringifyNumbers(object)); // {num: '1', val: '4', isRight: true, random: '66'}

// ! OPTIONAL CHALLENGE - collectStrings
// Write a function called collectStrings
// which accepts an object and returns
// an array of all the values in the object that have a typeof string
// EXAMPLE:
//  collectStrings(obj) // ["foo", "bar", "baz"])

const obj = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
          },
        },
      },
    },
  },
};

const collectStrings = (obj) => {
  let arr = [];

  function helper(input) {
    for (let key in input) {
      if (typeof input[key] === "object") {
        helper(input[key]);
      }
      if (typeof input[key] === "string") {
        arr.push(input[key]);
      }
    }
  }

  helper(obj);
  return arr;
};

console.log(collectStrings(obj)); //  ['foo', 'bar', 'baz']

// ! SEARCHING ALGORITHMS

// ! LINEAR SEARCH (one by one, in a strict order)
// ! Big O = O(n)

// * indexOf
// * includes
// * find
// * findIndex

// LINEAR SEARCH PSEUDOCODE (O(n))
const linearSearch = (arr, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
};
console.log(linearSearch([1, 3, 5, 2, 4], 5));

// ! BINARY SEARCH
// ! (much faster that the linear search,
// ! beacuse it eliminates HALF of the remaining elements at a time).
// ! BUT it works only for SORTED arrays

// BINARY SEARCH PSEUDOCODE (based on Divide and Conquer method)
// O (log n) complexity
const binarySearch = (arr, val) => {
  // 1. Making sure that the input array s sorted
  arr = arr.sort(function (a, b) {
    // sort() converts all the emes to strings and sort them alphabetically
    return a - b;
  });

  // 2. Defining the index pointers
  let left = 0;
  let right = arr.length - 1;
  let middleIndex = Math.floor((left + right) / 2);

  //  3. Looping
  while (arr[middleIndex] !== val && left <= right) {
    if (arr[middleIndex] < val) {
      left = middleIndex + 1;
    } else {
      right = middleIndex - 1;
    }
    middleIndex = Math.floor((left + right) / 2);
  }
  // 4. If the val wasn't found in the arr, return -1
  return arr[middleIndex] === val ? middleIndex : -1;
};

console.log(binarySearch([1, 2, 3, 4, 5], 2)); // 1
console.log(binarySearch([1, 2, 3, 4, 5], 12)); // -1

// ! NAIVE STRING SEARCH
// Find the short string in the long string

const naiveSearch = (long, short) => {
  let count = 0;

  // Looping through the long string
  for (let i = 0; i < long.length; i++) {
    // Looping through the short string
    for (let j = 0; j < short.length; j++) {
      // If short[0] !== long[0 + 0] break;
      // OR if short[1] !== short[0+1] break
      if (short[j] !== long[i + j]) break;

      // If j === 1 That means the fuul match of 2 chars is found. Count it
      if (j === short.length - 1) count++;
    }
  }
  // Return the result of counting
  return count;
};
console.log(naiveSearch("lorie loled", "lo")); // 2
console.log(naiveSearch("lorie loled", "pop")); // 0

// ! SWAPPING ALGORITHM
// APPROACH 1
function swap(arr, idx1, idx2) {
  let temp = arr[idx1]; // 1
  arr[idx1] = arr[idx2]; // 2
  arr[idx2] = temp; // 1
}

// APPROACH 2
function swapAlternatively(arr, idx1, idx2) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

// ! BUBBLE SORT
// ! A sorting algorithm
// ! where the largest values bubble up to the top
// ! (during multiple iterations)
// ! Time complexity = O(n^2) BUT if the data is nearly sorted, then Big O can be O(n)

function bubbleSort(arr) {
  let swap;

  // Start looping from the end to the beginning (from index 6 to index 0)
  for (let i = arr.length - 1; i >= 0; i--) {
    // from 6 to 0 => 18, 23, 56, 67, 2, 14, 3

    swap = false;
    // Inner loop - from the beginning to i (this way, we reduce the length of the iterations)
    // 1st iteration: from arr[0] to arr[6]
    // 2nd: from arr[0] to arr[5]
    // 3rd: from arr[0] to arr[4] etc
    // The biggest nembers will end up at the end of the array due to swapping,
    // so we don't need to loop through the entire array on each iteration
    for (let j = 0; j < i; j++) {
      // 3, 14, 2, 67, 56, 23 => 3, 14, 2, 67, 56 => 3, 14, 2, 67 => 3, 14, 2 => 3, 14 => 3
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // 3, 2, 14, 56, 23, 18, 67
        // 2, 3, 14, 23, 18, 56
        // 2, 3, 14, 18, 23
        // 2, 3, 14, 18, => no swaps from this iteration
        // 2, 3, 14
        // 2, 3,
        // 2
        swap = true;
      }
    }
    // If we have an array which is ALMOST sorted (see the example below)
    // then we don't need the code to keep running until i = 0.
    // In this case, we just checking, if there was a swap during the last iteration
    // and if there wasn't, then we break out.
    if (!swap) break;
  }
  return arr;
}

console.log(bubbleSort([3, 14, 2, 67, 56, 23, 18])); // [2, 3, 14, 18, 23, 56, 67]
console.log(bubbleSort([2, 1, 3, 4, 5, 6, 7])); // [1, 2, 3, 4, 5, 6, 7]

// ! SELECTION SORT
// ! Big O = O(n^2);
// ! Sorting starts from the first element which compares to the
// ! other elements, and when the smallest is found,
// ! the first element swaps with it (the smallest element goes to the first place)
// ! [5, 3, 4, 1, 2] => 5 compares to every elem. 1 is the smallest. 5 and 1 swap.
// ! result of the first iteration: [1, 3, 4, 5, 2].
// ! The next round of iterations starts from the second element.
// ! The result of the 2nd iteration: [1, 2, 4, 5, 3].
// ! The result of the 3rd iteration: [1, 2, 3, 5, 4].
// ! The result of the 4th iteration: [1, 2, 3, 4, 5].

function selectionSort(arr) {
  const swap = (arr, index1, index2) => {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  };
  // COMMENTS FOR THE VERY FIRST ROUND OF ITERATIONS
  for (let i = 0; i < arr.length; i++) {
    let lowest = i; // index 0 => elem "5", then index 3 => elem "1"
    for (let j = i + 1; j < arr.length; j++) {
      // start from the elem "3", the - from 4 and so on
      if (arr[j] < arr[lowest]) {
        // if "3" < "5", then - if "4" < "3", then - if "1" < "4", and so on
        lowest = j; // index 1, then - index 3
      }
    }
    // swap the smallest elem with the first elem
    // but only if it's not the smallest already
    // (we don't want to do an extra round of iteration in vain)
    if (i !== lowest) {
      // ! (meaning: if i became j)
      swap(arr, i, lowest);
      // let temp = arr[i]; // 5
      // arr[i] = arr[lowest]; // 5 = 1
      // arr[lowest] = temp; // 1 = 5 => [1, 3, 4, 5, 2]
    }
  }

  return arr;
}
console.log(selectionSort([1, 3, 4, 5, 2])); // [1, 2, 3, 4, 5]

// ! INSERTION SORT
// !Big O = O(n^2). Can work for almost sorted data
// It gradually creates a larger left half which is always sorted.
// Initial array: [5, 3, 4, 1, 2]
// [3, 5, 4, 1, 2]
// [3, 4, 5, 1, 2]
// [1, 3, 4, 5, 2]
// [1, 2, 3, 4, 5]

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    // let's say, the currentVal = 0
    // this is how it will be moved to its right place:
    for (var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j];
      // We compare it to 5 (arr[j]). If 5 is bigger than currentVal (0), then we move 5 up
      // Result; [1, 2, 3, 4, 5, 5], currentVal = 0;
      // Then we compare currentVal (0) to 4. If 4 is bigger than 0, we move 4 up
      // Result: [1, 2, 3, 4, 4, 5], currentVal = 0;
      // Then we compare currentVal (0) to 3. If 3 is bigger than 0, we move 3 up
      // Result: [1, 2, 3, 3, 4, 5], currentVal = 0;
      // Then we compare currentVal (0) to 2. If 3 is bigger than 0, we move 2 up
      // Result: [1, 2, 2, 3, 4, 5], currentVal = 0;
      // Then we compare currentVal (0) to 1. If 1 is bigger than 0, we move 1 up
      // Result: [1, 1, 2, 3, 4, 5], currentVal = 0;
      // When the inner loop is over (we reached its limit), we just plae the value at the beginning
    }
    arr[j + 1] = currentVal; // not arr[j] BUT arr[j + 1] because after comaprison j will move
    // 1 step towards the beginning of the array
    // (in our case - to the index -1: because if it's >= 0,
    // it actually can make one more move after it became = 0)
    // So, arr[j] will be = null. And arr[j+1] = 1: [1, 1, 2, 3, 4, 5].
    // And we take this arr[j+1] and transform it to our currentVal, 0: [0, 1, 2, 3, 4, 5]
  }
  return arr;
}

console.log(insertionSort([1, 2, 3, 4, 5, 0]));
