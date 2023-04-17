// ! INTERMEDIATE SORTING ALGORITHMS
// ! Much faster than basic sorting algorithms.
// ! They can improve time complexity from O(n^2) to O(n log n)

// ! MERGE SORT 
// ! Time complexity = O(n log n) for the best, average and worst case
// ! Space Complexity = O(n): the larger input array is, the more space will saving the splitted arrays take.
// * Split up => merge => sort

// PART 1 - Merging 2 sorted arrays
function mergeTwoSortedArrays(arr1, arr2) {
  let newArr = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] >= arr2[j]) {
      newArr.push(arr2[j]);
      j++;
    } else {
      newArr.push(arr1[i]);
      i++;
    }
  }

  // Pushing the rest of numbers
  //   (if one sorted array is longer then another) to the newArr:
  while (i < arr1.length) {
    newArr.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    newArr.push(arr2[j]);
    j++;
  }

  return newArr;
}

console.log(mergeTwoSortedArrays([2, 14, 17, 35], [0, 12, 18, 68, 99])); // [0, 2, 12, 14, 17, 18, 35, 68, 99]
console.log(mergeTwoSortedArrays([], [0, 12, 18, 68, 99])); //  [0, 12, 18, 68, 99]

// PART 2 - Splitting the unsorted array using slice() and recursion
function splitAndMerge(arr) {
  //   Base case
  if (arr.length <= 1) return arr;

  // Otherwise, keep splitting the array into halves
  // util the arr. length = 1: [3], [45], [24], etc
  let middle = Math.floor(arr.length / 2);

  let left = splitAndMerge(arr.slice(0, middle)); // with slice(), "middle" will not be cut [3, 45, 24]
  let right = splitAndMerge(arr.slice(middle)); // from 7 to 2
  return mergeTwoSortedArrays(left, right);
}

console.log(splitAndMerge([3, 45, 24, 7, 56, 33, 2])); // [2, 3, 7, 24, 33, 45, 56]

// ! QUICK SORT
// ! Time complexity: BEST & AVG (unsorted array) = O(n log n), WORST (happens when the array is sorted) = O(n^2)
// ! Space complexity: O(log n)
// * Define a pivot (starting point) => split the array => sort

function pivotHelper(arr, startIndex = 0) {
  let pivot = arr[startIndex]; // first elem = starting point
  let swapIndex = startIndex; // swapIndex will change during the process

  const swap = (arr, index1, index2) => {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  };

  for (let i = startIndex + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      swapIndex++; // swapIndex = 1,
      swap(arr, swapIndex, i); //  swapIndex = 1, i = 2 => swapIndex = 2, i = 1
      // [28, 4, 41...]
    }
  }
  swap(arr, startIndex, swapIndex); // to place the pivot on its right spot in the array ater sorting

  return swapIndex;
}
console.log(pivotHelper([28, 41, 4, 56, 2, 1, 40])); // 3 (in the sorted array 28 has index 3: [1, 4, 2, 28, 41, 56, 40])

// Then recursively call quickSort() on the left side of the pivot and then - on the right side
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivotHelper(arr, left); // pivoiIndex = 3 (the elem is 28) => [1, 4, 2, 28, 41, 56, 40]
    // Sorting the left side
    quickSort(arr, left, pivotIndex - 1); // [1, 4, 2]; => [1](becomes left) and [4, 2](becomes right, then swaps)
    // Sorting the right side
    quickSort(arr, pivotIndex + 1, right); // [41, 56, 40]
  }
  return arr;
}

console.log(quickSort([28, 41, 4, 56, 2, 1, 40])); // [1, 2, 4, 28, 40, 41, 56]

// ! RADIX SORT FOR POSITIVE & NEGATIVE NUMBERS
// ! Time complexity: O(nk), always. n = length of array. k = number of digits. 
// ! Which is equally is as good as O(n log n)
// ! Space complexity: O (n + k)
// * This algorithm doesn't make comparisons & it works on numbers.
// * It works with 'buckets'.
// * Logic: more digits means a bigger number!

// Radix sort requires several helper methods.
// FIRST - to get the particular digit/index of the elem startng from the end of the number,
//  "the bucket number"
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10; // * Round(Positive Number(3456) / 10^2) % 10 = Round(3456 / 100) % 10 = Round(34.56) % 10 = 34 % 10 = 4
}
console.log(getDigit(-3456, 2)); // 4 (elem with index 2 if we count from the end)

// SECOND - to get the quantity of digits
function countDigits(num) {
  if (String(num) === "undefined") return 0;
  if (num === 0) return 1;
  return String(Math.abs(num)).length; // * Convert to string (a positive number). and get the length
}
console.log(countDigits(13456)); // 5

// THIRD - get the longest number from the array and return its length 
function mostDigits(arr) {
  let maxDigits = 0;

  for (let i = 0; i < arr.length; i++) {
    maxDigits = Math.max(maxDigits, countDigits(arr[i])); // ! countDigits was used here
  }
  return maxDigits;

  // let biggest = 0;
  // let buff = 0;

  // for (let elem of arr) {
  //   elem = String(Math.abs(elem));
  //   buff = elem.length;
  //    if (biggest < buff) {
  //     biggest = buff;
  //    }
  // }
  // return biggest;
}
console.log(mostDigits([1234, 4, 34, 567, 0, -23345])); // 5

function radixSort(arr) {
  // Figure out how many digits has the largest number 
  let largest = mostDigits(arr); // ! mostDigits was used here

  // Start the loop from 0 to this largest number of digits
  for (let i = 0; i < largest; i++) {
    let posDigitBuckets = Array.from({ length: 10 }, () => []); // made an array filled with 10 empty subarrays
    let negDigitBuckets = Array.from({ length: 10 }, () => []);

    // Then loop through every number of the input arr
    for (let j = 0; j < arr.length; j++) {
      let digit = getDigit(arr[j], i);
      if (arr[j] >= 0) {
          posDigitBuckets[digit].push(arr[j])
      } else {

          negDigitBuckets[negDigitBuckets.length - 1 - digit].push(arr[j]);
      }
    }
 
    arr = [].concat(...negDigitBuckets);
    arr = arr.concat(...posDigitBuckets)
    
  }
  
  return arr
}

console.log(radixSort([-12, 3456, -1, 23, 78, -453, 345, 65])); //  [-453, -12, -1, 23, 65, 78, 345, 3456]