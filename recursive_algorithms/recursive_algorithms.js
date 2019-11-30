// https://gist.github.com/kaylajaograham/e31a30b70c82a3e15de260617f269039

// 1. Counting Sheep
// Write a recursive function that counts how many sheep jump over the fence. 
// Your program should take a number as input. That number should be the number of 
// sheep you have. 
// The function should display the number along with the message 
// "Another sheep jumps over the fence" until no more sheep are left.
// Input: 3
// Output:
// 3: Another sheep jump over the fence
// 2: Another sheep jump over the fence
// 1: Another sheep jump over the fence
// All sheep jumped over the fence


function countingSheep(sheep) {
  if(sheep === 0) {
    console.log('All sheep jumps over the fence');
    return;
  }

  console.log(`${sheep}: Another sheep jump over the fence`);
  countingSheep(sheep-1);
}

countingSheep(3);


// 2. Power Calculator
// Write a function called powerCalculator() that takes two parameters, an integer as a base, and another integer as an exponent. The function returns the value of the base raised to the power of the exponent. Use only exponents greater than or equal to 0 (positive numbers)
// powerCalculator(10,2) should return 100
// powerCalculator(10,-2) should return exponent should be >= 0

function powerCalculator(base, exp) {
  // exception
  if (exp < 0) {
    return 'exponent should be >= 0';
  }

  // base case 
  if(exp === 0){
    return 1;
  }

  //base * base(nth many times)
  // base * recursion(*base)
  return base * powerCalculator(base, exp - 1);
}

console.log(powerCalculator(4,3))


// 3. Reverse String
// Write a function that reverses a string. Take a string as input, reverse the string, and return the new string.

function reverseString(str) {
  //base case
  if(!str.length) {
    return '';
  }

  return reverseString(str.slice(1)) + str[0];
}

console.log(reverseString('abc'));

// 4. nth Triangular Number
// Calculate the nth triangular number. A triangular number counts the objects that can form an equilateral triangle. The nth triangular number is the number of dots composing a triangle with n dots on a side, and is equal to the sum of the n natural numbers from 1 to n. This is the Triangular Number Sequence: 1, 3, 6, 10, 15, 21, 28, 36, 45.

//                           *
//             *           *    *
// *     |   *   *  |   *    *    *  |

//  1st       2nd           3rd             nth?  

function triangleNum(num) {
  // base case
  if(!num) {
    return 0;
  }

  return num + triangleNum(num - 1);
}

console.log(triangleNum(9));


// 5. String Splitter
// Write a recursive function that splits a string based on a separator (similar to String.prototype.split). Don't use JS array's split function to solve this problem.

// Input: 02/20/2020
// Output: ["02", "20", "2020"]

function stringSplitter(str, splitter) {
  console.log(str)
  // base case
  if (!str.length) {
    return [];
  }

  return [str.slice(0, str.indexOf(splitter)), ...stringSplitter(str.slice(1+str.indexOf(splitter)), splitter)]

  // return str.indexOf(splitter)
  // return [str.slice(0, str.indexOf(splitter))]
}

console.log(stringSplitter('02/20/2020', '/'))


