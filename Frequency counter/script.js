/* PROBLEM 1

Write a function which accepts 2 arrays.
The function should return true if every value in the first array
has its corresponding value squared in the second array.
The frequency of values must be the same.
*/

function same(arr1, arr2) {
  // Compare the length of the arrays
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Count the array elememts and store them
  // as key-value pairs i objects
  let obj1 = {};
  let obj2 = {};

  for (let elem of arr1) {
    arr1[elem] ? (arr1[elem] += 1) : (arr1[elem] = 1);
  }

  for (let elem of arr2) {
    arr2[elem] ? (arr2[elem] += 1) : (arr2[elem] = 1);
  }

  for (let key in obj1) {
    // Check if the keys from obj1
    // are equals to the corresponding keys squared
    // of the obj2
    if (!(key ** 2 in obj2)) {
      return false;
    }

    // Check the frequency of the values in the objects
    if (obj2[key ** 2] !== obj1[key]) {
      return false;
    }
  }
  return true;
}

console.log(same([1, 2, 3, 4], [1, 4, 9, 16])); // true
console.log(same([1, 2, 3, 4], [1, 4, 9, 16, 16])); // false
console.log(same([1, 2, 3, 4], [1, 4, 9, 16, 100])); //false

/* PROBLEM 2

Given 2 strings.
Write a function to determine if the second string
is an anagram of the first (e.g. "cinema" - "iceman");
*/

function isAnagram(str1, str2) {
  // If the length of the strings is different, return false
  if (str1.length !== str2.length) return false;

  let obj = {};

  // Fill the obj with the characters of the str1 and count each character
  for (let elem of str1.toLowerCase()) {
    obj[elem] ? (obj[elem] += 1) : (obj[elem] = 1);
  }

  // Compare the obj values to the characters of the str2
  for (let elem of str2.toLowerCase()) {
    // If the obj does not have such char as a key, return false
    if (!elem in obj) return false;
    // Otherwise, deduct the value
    obj[elem]--;
  }

  // Check the object after comparing to str2:
  // all the values after deduction have to be equal to 0
  for (let key in obj) {
    // If they are bigger than 0, return false
    if (obj[key] > 0) {
      return false;
    } else {
      return true;
    }
  }
}

console.log(isAnagram("Cinema", "iceman")); // true
console.log(isAnagram("cinema", "izeman")); // false
console.log(isAnagram("cinema", "icemann")); // false

/* PROBLEM 3

Write a function called sameFrequency.
Given two positive integers, find out
if the two numbers have the same digits and frequency of digits.
*/

function sameFrequency(str1, str2) {
  // Transform the numbers into the array of strings
  let arr1 = str1.toString().split("");
  let arr2 = str2.toString().split("");

  // Compare the length of the arrays
  if (arr1.length !== arr2.length) return false;

  // If arr2 does not include an element from arr1, retirn false
  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) {
      return false;
    }
  }
  return true;
}

console.log(sameFrequency(182, 281)); // true
console.log(sameFrequency(34, 14)); // false
console.log(sameFrequency(3589578, 5879385)); // true
console.log(sameFrequency(22, 222)); // false
