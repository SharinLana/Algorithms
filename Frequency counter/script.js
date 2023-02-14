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


/* PROBLEM 2

Given 2 strings.
Write a function to determine if the second string
is an anagram of the first (e.g. "cinema" - "iceman");
*/

function isAnagram(str1, str2) {
  // IF THE LENGTH OF THE STRINGS IS DIFFERENT, RETURN FALSE
  if (str1.length !== str2.length) return false;

  let obj = {};

  // FILL THE OBJ WITH THE CHARACTERS OF THE STR1
  // AND COUNT EACH CHAR
  for (let elem of str1.toLowerCase()) {
    obj[elem] ? (obj[elem] += 1) : (obj[elem] = 1);
  }

  // COMPARE THE OBJ VALUES TO THE CHARACTERS OF THE STR2
  for (let elem of str2.toLowerCase()) {
    // IF THE OBJ DOES NOT HAVE SUCH CHAR AS A KEY, RETURN FALSE
    if (!elem in obj) return false;
    // OTHERWISE, DEDUCT THE VALUE
    obj[elem]--;
  }

  // CHECK THE OBJECT AFTRE COMPARING TO THE STR2:
  // ALL THE VALUES AFTER DEDUCTION HAVE TO BE = 0
  for (let key in obj) {
    // IF THEY ARE BIGGER THAN 0, RETURN FALSE
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
