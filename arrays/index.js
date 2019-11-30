const Array = require('./array')

function main(){

  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array(3);

  // Add an item to the array
  arr.push(3);
  //array: [3, null, null]
  arr.push(5);
  //array: [3, 5, null]
  arr.push(15);
  //array: [3, 5, 15]
  arr.push(19);
  //array: [3, 5, 15, 19, null, null]
  arr.push(45);
  //array: [3, 5, 15, 19, 45, null]
  arr.push(10);
  //array: [3, 5, 15, 19, 45, 10]

  console.log(`Array: ${arr.printArray()}`);
  console.log(`Memory: ${arr.printMemory()}`);
}


main();

//2. Explore the push() method

//What is the length, capacity and memory address of your array?
//A: length: 1; capacity: 3; memory address: 0

//What is the length, capacity and memory address of your array? Explain the result of your program after adding the new lines of code.
//A: length/capacity: 6; memory address: 5

//3. Exploring the pop() method

//What is the length, capacity, and address of your array? Explain the result of your program after adding the new lines of code.
//A: length/capacity: 3; memory address: 2

//4. Understanding more about how arrays work

//Print the 1st item in the array arr
//A: 3

//Empty the array and add just 1 item: arr.push("tauhida");
//["tauhida"]
//Print this 1 item that you just added. What is the result? Can you explain your result?

//What is the purpose of the _resize() function in your Array class?