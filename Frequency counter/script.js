/* PROBLEM 1

Write a function which accepts 2 arrays.
The function should return true if every value in the first array
has its corresponding value squared in the second array.
The frequency of values must be the same.
*/

function same(arr1, arr2) {
  // CHECKING IF THE LENGTH OF THE ARRAYS IS THE SAME
  if (arr1.length !== arr2.length) {
    return false;
  }

  // COUNTING THE ELEMENTS OF THE ARRAYS
  // AND STORING THEM AS KEY-VALUE PAIRS IN OBJECTS
  let obj1 = {};
  let obj2 = {};

  for (let elem of arr1) {
    arr1[elem] ? (arr1[elem] += 1) : (arr1[elem] = 1);
  }

  for (let elem of arr2) {
    arr2[elem] ? (arr2[elem] += 1) : (arr2[elem] = 1);
  }

  for (let key in obj1) {
    // CHECKING IF KEYS FROM THE OBJ1
    // ARE EQUALS TO THE CORRECPONDING KEYS SQUARED OF THE OBJ2
    if (!(key ** 2 in obj2)) {
      return false;
    }

    // CHECKING THE FREQUANCY OF THE VALUES
    if (obj2[key ** 2] !== obj1[key]) {
      return false;
    }
  }
  return true;
}

console.log(same([1, 2, 3, 4], [1, 4, 9, 16])); // true
console.log(same([1, 2, 3, 4], [1, 4, 9, 16, 16])); // false
console.log(same([1, 2, 3, 4], [1, 4, 9, 16, 100])); //false
