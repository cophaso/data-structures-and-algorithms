const util = require('util');

// Notes: Two of the most commonly used data structures in web development are stacks and queues.
// Stack = data structure similar to a list with access restricted to only 1 end. Stores elements in a LIFO (Last In First Out) order.

// Write a Stack class with its core functions (push, pop) from scratch
// Standard way to implement a stack is using a singly linked list with constraints on its operations, where items can be inserted and deleted at only 1 place, the end of the list.
// push(): places data onto the top of a stack
// pop(): removes data from the top of the stack

// Creates a node containing the data and a reference to the next item
class _Node {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}

// Create the constructor method for the stack. Start with an empty 1st node, represented by null and this indicates the top of the stack
class Stack {
    constructor() {
        this.top = null; // top of stack
    }
    push(data) { 
        if (this.top === null) { // if the stack is empty, then the node will be the top of the stack
            this.top = new _Node(data, null);
            return this.top;
        }
        // If the stack already has something, then create a new node, add data to the new node, and have the pointer point to the top
        const node = new _Node(data, this.top);
        this.top = node;
    }
    pop() {
        // In order to remove the top of the stack, you have to point the pointer to the next item and that next item becomes the top of the stack
        const node = this.top;
        this.top = node.next;
        return node.data;
    }
}

// 1. Create a stack class
// Create a stack called starTrek and add Kirk, Spock, McCoy, and Scotty to the stack.

let starTrek = new Stack();
starTrek.push('Kirk')
starTrek.push('Spock')
starTrek.push('McCoy')
starTrek.push('Scotty')
console.log('peek ===', peek(starTrek));
console.log('isEmpty ===', isEmpty(starTrek));
// console.log('starTrek ===', starTrek);
// console.log(display(starTrek));
// remove McCoy from stack
starTrek.pop();
starTrek.pop();
// popped twice to remove McCoy;

// console.log(display(starTrek)); // returns 'Scotty' on top and 'McCoy' second

/*
2. Useful methods for a stack
implement helper functions outside of the class:
peek(): allows you to look at the top of the stack without removing it
isEmpty(): allows you to check if the stack is empty or not
display(): to display the stack - what is the 1st item in the stack
Remove McCoy from the stack and display the stack
*/

function peek(stack) {
    if (stack.top === null) { // checks if stack is empty
        return null;
    }
    // console.log('peek =', starTrek.top.data)
    return starTrek.top.data;
}

function isEmpty(stack) {
    if (stack.top === null) { // if list is empty return true;
        return true;
    } 
    return false;
}

function display(stack) {
    let node = stack.top; // set variable for top of stack
    // console.log('line 81 ===', node)
    while (node !== null) { // iterate through stack as long current node has data
        console.log('display ===', node.data); // display data inside current node
        node = node.next; // move to next node
    }
}

/*3. Check for palindromes using a stack
A palindrome is a word, phrase, or number that is spelled the same forward and backward. For example, “dad” is a palindrome; “A man, a plan, a canal: Panama” is a palindrome if you take out the spaces and ignore the punctuation; and 1,001 is a numeric palindrome. We can use a stack to determine whether or not a given string is a palindrome.

Write an algorithm that uses a stack to determine whether a given input is palindrome or not. Use the following template as a starting point.*/

function is_palindrome(s) {
    s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

    let newStack = new Stack();
    for (let i = 0; i < s.length; i++) {
        newStack.push(s[i]);
    }

    let newString = '';
    for (let i = 0; i < s.length; i++) {
        newString += newStack.pop();
    }
    // console.log('newstring =', newString)
    // console.log('s =', s)
    return newString === s;
}

// True, true, true, false
console.log(is_palindrome("dad"));
console.log(is_palindrome("A man, a plan, a canal: Panama"));
console.log(is_palindrome("1001"));
console.log(is_palindrome("William"));

/*4. Matching parentheses in an expression
A stack can be used to ensure that an arithmetic expression has balanced parentheses. Write a function that takes an arithmetic expression as an argument and returns true or false based on matching parenthesis. As a bonus provide a meaningful error message to the user as to what's missing. For example, you are missing a ( or missing a ")".*/

function matchingP(math) {
    let stack = new Stack;

    let map = {
      '(' : ')'
    };

    for  (let i = 0; i < math.length; i++) {
      // If character is an opening brace add it to a stack
      if(math[i] === '('){
        stack.push(math[i]);
      } 
      //  If that character is a closing brace, pop from the stack, which will also reduce the length of the stack each time a closing bracket is encountered.
      else {
        let last = stack.pop();
        //If the popped element from the stack, which is the last opening brace doesn’t match the corresponding closing brace in the map, then return false
        if (math[i] !== map[last]) {
          return false
        };
      }
    };
    // By the completion of the for loop after checking all the brackets of the str, at the end, if the stack is not empty then fail
    if (stack.length !== 0) {return false};

    return true;
};

// console.log(matchingP("(){}")); // returns true
// console.log(matchingP("[{()()}({[]})]({}[({})])((((((()[])){}))[]{{{({({({{{{{{}}}}}})})})}}}))[][][]")); // returns true
// console.log(matchingP("({(()))}}"));  // returns false

/*For version 1, the parentheses you need to consider are ( and ). Finding a close parenthesis without an open parenthesis is an error (report the location of the close); reaching the end of the string while still "holding" an open parenthesis is also an error (report the location of the open).*/



/*Extension exercise: Recognize 3 pairs of brackets: (), [], and {}. These must be correctly nested; "([)]" is incorrect, and should report an error at the ), stating that you were expecting a ] but found a ). If this is starting to look and sound very familiar, congratulations - you're beginning to write a simple language parser! */


/*5. Sort stack
Write a program to sort a stack such that the smallest items are on the top (in ascending order). You can use an additional stack, but you may not use any other data structure (such as an array, or linked list).*/

function sort(stack) {
    let tempStack = new Stack();
    let tempValue;

    while(!isEmpty(stack)) { // when stack isnt empty
        tempValue = stack.pop(); // remove nodes from stack

        while(peek(tempStack) > tempValue && tempStack.top !== null) {
            // if top of stack is greater than tempStack, then add it to stack
            stack.push(tempStack.pop());
        }
        // push temp in tempory stack
        tempStack.push(tempValue);
    }

    while(!isEmpty(tempStack)) {
        stack.push(tempStack.pop());
    }
    // console.log('stack ===', stack);
    return stack;
}

let sortInput = new Stack();
sortInput.push(12);
sortInput.push(24);
sortInput.push(55);
// sortInput.push(2);
// console.log(sortInput);
// console.log(sort(sortInput));

/*6. Create a queue using Singly linked list
Walk through the Queue class in the curriculum and understand it well. Then write a Queue class with its core functions (enqueue(), dequeue()) from scratch.*/

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

//the time complexity of inserting in a queue is constant, O(1)
  enqueue(data){
    const node = new _Node(data);

    //makes new node first if null
    if(this.first === null){
      this.first = node;
    }

    //moves last node up in the queue
    if(this.last){
      this.last.next = node;
    }

    //make new node the last item
    this.last = node;
  }

//the time complexity of removing an item from a queue is constant, O(1)
  dequeue(){
    //if queue is empty, nothing to remove
    if(this.first === null){
      return;
    }

    //set pointer to first item
    const node = this.first

    //move pointer to next in the queue and make it first
    this.first = this.first.next;

    //if this is the last item in the queue
    if(node === this.last){
      this.last = null;
    }
    return node.value;
  }
}

/*Create a queue called starTrekQ and add Kirk, Spock, Uhura, Sulu, and Checkov to the queue.*/

// const starTrekQ = new Queue;

// starTrekQ.enqueue(Kirk);
// starTrekQ.enqueue(Spock);
// starTrekQ.enqueue(Uhura);
// starTrekQ.enqueue(Sulu);
// starTrekQ.enqueue(Checkov);

//console.log(starTrekQ);

/*Implement a peek() function outside of the Queue class that lets you take a peek at what the 1st item in the queue is.*/

function peekQ(queue){
  return util.inspect(queue, {depth:1});
}

//console.log(peekQ(starTrekQ))

/*Implement a isEmpty() function outside the Queue class that allows you to check if the queue is empty or not*/

function isEmptyQ(queue){
  queue.first === null;

  const currNode = queue.first;

  if(!currNode){
    // is empty!
    return true;
  } else {
    // not empty!
    return false;
  }
}

// empty = new Queue;

//console.log(isEmptyQ(empty));
//console.log(isEmptyQ(starTrekQ));

/*Implement a display() function outside of the Queue class that lets you display what's in the queue.*/

function displayQ(queue){
  return util.inspect(queue, {depth:null});
}

//console.log(displayQ(starTrekQ));

/*Remove Spock from the queue and display the resulting queue.*/

//starTrekQ.dequeue();

//console.log(starTrekQ);

/*7. Create a queue class using Doubly linked List
Use the items listed in #6 and enqueue them to your queue.*/

// class Dequeue {
//   constructor() {
//     this.first = null;
//     this.last = null;
//   }

// //the time complexity of inserting in a queue is constant, O(1)
//   enqueueFirst(data){
//     const node = new _Node(data);

//     //makes new node first if null
//     if(this.first === null){
//       this.first = node;
//     }

//     //moves last node up in the queue
//     if(this.last){
//       this.last.next = node;
//     }

//     //make new node the last item
//     this.last = node;
//   }

//   enqueueLast(data){
//     const node = new _Node(data);

//     //makes new node last if null
//     if(this.last === null){
//       this.last = node;
//     }

//     //moves first node up in the queue
//     if(this.first){
//       this.first.next = node;
//     }

//     //make new node the last item
//     this.last = node;
//   }

// //the time complexity of removing an item from a queue is constant, O(1)
//   dequeueFirst(){
//     //if queue is empty, nothing to remove
//     if(this.first === null){
//       return;
//     }

//     //set pointer to first item
//     const node = this.first

//     //move pointer to next in the queue and make it first
//     this.first = this.first.next;

//     //if this is the last item in the queue
//     if(node === this.last){
//       this.last = null;
//     }
//     return node.value;
//   }

//     dequeueLast(){
//     //if queue is empty, nothing to remove
//     if(this.last === null){
//       return;
//     }

//     //set pointer to last item
//     const node = this.last

//     //move pointer to next in the queue and make it last
//     this.last = this.last.next;

//     //if this is the first item in the queue
//     if(node === this.first){
//       this.first = null;
//     }
//     return node.value;
//   }
// }

/*Check to see who is first one on the Queue?*/


/*8. Queue implementation using a stack
There are many ways to implement a queue. You have learned using singly linked list, and doubly linked list. Keeping the concept of a queue in mind, implement a queue using 2 stacks and no other data structure. (You are not allowed to use a doubly linked list or array. Use your stack implementation with a linked list from above to solve this problem.)*/



/*9. Square dance pairing
As people come to the dance floor, they should be paired off as quickly as possible: man with woman, man with woman, all the way down the line. If several men arrive in a row, they should be paired in the order they came, and likewise if several women do. Maintain a queue of "spares" (men for whom you have no women yet, or vice versa), and pair them as appropriate.

F Jane
M Frank
M John
M Sherlock
F Madonna
M David
M Christopher
F Beyonce

Female dancer is Jane, and the male dancer is Frank
Female dancer is Madonna, and the male dancer is John
Female dancer is Beyonce, and the male dancer is Sherlock
There are 2 male dancers waiting to dance*/



/*10. The Ophidian Bank
At the Ophidian Bank, a single teller serves a long queue of people. New customers join the end of the queue, and the teller will serve a customer only if they have all of the appropriate paperwork. Write a representation of this queue; 25% of the time (random), a customer's paperwork isn't quite right, and it's back to the end of the queue. Show what a few minutes of the bank's lobby would look like.
*/