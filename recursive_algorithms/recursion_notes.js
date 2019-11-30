
const countDown = function(from) {
    // Base case
    if (from === 0) {
        return;
    }

    // General case
    console.log(from);
    countDown(from - 1);
    console.log('POST' + ' ' + from);
};

// 5, 4, 3, 2, 1
// POST 1, POST 2, POST 3, POST 4, POST 5
//countDown(5);

const upperStr = function(str){
    if (str === "") {
        return "";
    }
    const newChar = str[0].toUpperCase();
    // Concatenate new data with reduced string for next iteration...
    // A + (B) + ... + (C)....
    // A + recursion(B + recursion(C + recursion))
    // ABC
    return newChar + upperStr(str.slice(1));
};
//console.log(upperStr('abc'));

const arrayDoubler = (array) => {
    //base case
    // length = 0 --> in JS means FALSE (!FALSE) = TRUE
    if (!array.length) {
        return [];
    }

    // [2].concat([4].contact([6].concat([]))
    return [2*array[0], ...arrayDoubler(array.slice(1))];

};
console.log(arrayDoubler([1, 2, 3]));

// === Slice Array Method == //
/**
 *  @Description returns an array copy, from specified
 *  start and end indexes, if none provided returns entire array.
 *
 *  @start {number} | index number from where to start copying.
 *  @end {number} | index number from where to stop copying.
 *
 *  @Examples
 *
 *
 *  [1,4,5,8].slice(0, 2) -> [1,4,5]
 *
 *
 *
 *  [1,4,5,8].slice(2) -> [5, 8]
 *
 *
 *
 *  [1,4,5,8].slice() => [1,4,5,8]
 *
 * */
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice



// === Spread Array Operator == //

/**
 *
 * @Example
 *
 *  [...[3, 5], ...[2, 1]] --> [3, 5, 2, 1]
 *
 *
 *  [ 3, ...[2, 1]] --> [3, 2, 1]
 *
 *  [3].concat([2,1]) --> [3, 2, 1];
 *
 *
 * */
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax





// == ES6 arrow function === //
//  x => x < 7
//
//  is the same as (not quite)
//
//  function predicate (x) {
//       return x < 7;
//  }
