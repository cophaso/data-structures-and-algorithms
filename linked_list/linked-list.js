const util = require('util')
/* Create a linked list class
Walk through the linked list code in the curriculum and understand it well. Then write a linked list class and its core functions (insertFirst, insertLast, remove, find) from scratch. */

// generic node
class _Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

// creating an empty linked list
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

// insertfirst
  insertFirst(item) {
    this.head = new _Node(item, this.head);
    this.size++;
  }

// insertlast
  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
          tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
      this.size++;
    }
  }

//remove
  remove(item){ 
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // If the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    // Start at the head
    let currNode = this.head;
    // Keep track of previous
    let previousNode = this.head;

    while ((currNode !== null) && (currNode.value !== item)) {
      // Save the previous node 
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
    this.size--;
  }

//find
  find(item) { 
    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item 
    while (currNode.value !== item) {
      /* Return null if it's the end of the list 
        and the item is not on the list */
      if (currNode.next === null) {
        return null;
      }
      else {
        // Otherwise, keep looking 
        currNode = currNode.next;
      }
    }
    // Found it
    return currNode;
  }

// Implement a function called insertBefore() in the class that inserts a new node before a given node containing a key. KAYLAAAAA
    insertBefore(key, item) {
      //no list, add item to list
      if (this.head === null) {
      return;
    }
      //if head === key, insert item before given node (key)
    if (this.head.value === key) {
      this.insertFirst(item);
      return;
    }
   // start at the head  
    let prevNode = null;
    let currNode = this.head;

    // check to current node is not the same as key and is not null
    while(currNode !== null && currNode.value !== key){
      prevNode = currNode;
      currNode = currNode.next;
    }
    //insert this new node between current node and previous node
    //if there is no node at key, return error.
    if (currNode === null){
      console.log('Node not found / Key not found')
      return;
    }
      prevNode.next = new _Node(item, currNode);
      this.size++;
  }

//Implement a function called insertAfter() in the class that inserts a new node after a node containing the key. AMBERRRRRRR

insertAfter(key, item){
  let tempNode = this.head;
  while(tempNode !== null && tempNode.value !== key){
     tempNode = tempNode.next;
  } 
  if(tempNode !== null){
    tempNode.next = new _Node(item, tempNode.next);
    this.size++;
  }  
}

//Implement a function called insertAt() that inserts an item at a specific position in the linked list. CRYSTALLLLLLLLLL
    insertAt(key, item) {
      // out of range
      if (key > 0 && key > this.size) {
          console.log('Out of range');
          return;
      }

      if(key === 0) {
          this.insertFirst(item);
          return;
      }

      const node = new _Node(item);
      let current, previous, counter;
      counter = 0;
      current = this.head;

      while(counter < key) {
          counter++;
          previous = current;
          current = current.next;
      }
      previous.next = node;
      node.next = current;
      this.size++;
    }

}

// Creating a singly linked list
// Write a function main. Within the function, using the linked list class above, create a linked list with the name SLL and add the following items to your linked list: Apollo, Boomer, Helo, Husker, Starbuck.

const sll = new LinkedList();

function main(){ 

  sll.insertLast('Apollo');
  sll.insertLast('Boomer');
  sll.insertLast('Helo');
  sll.insertLast('Husker');
  sll.insertLast('Starbuck');

  //Add Tauhida to the list.
  sll.insertLast('Tauhida');

  // //Remove Husker from the list.
  sll.remove('Husker');


  //Add Athena before Boomer using your insertBefore() function.
  sll.insertBefore('Boomer','Athena');

  //Add Hotdog after Helo using the insertAfter() method.
  sll.insertAfter('Helo','Hot dog');

  //Using the insertAt() method insert Kat in the 3rd position of the list.
  sll.insertAt(3,'Kat');

  // //Remove Tauhida from the list.
  sll.remove('Tauhida');
  
  //console.log(util.inspect(sll, {depth: null}))
  return sll;
}

main();

/*Implement the following functions that operate on your linked list class. Note that these should be free functions instead of methods of the linked list class, so implement them outside the linked list class. Test each function using the list created in exercise 1. */

// display: displays the linked list
function displayList(sll){
  return util.inspect(sll, {depth: null});
}
console.log(displayList(sll));

// size: returns the size of the linked list
function size(sll){
  return sll.size;
}
console.log(size(sll));

// isEmpty: finds if the list is empty or not (without using the size() function)
function isEmpty(sll){
  sll.head === null; 

  let currNode = sll.head;
  if(!currNode){
    // is empty!
    return true;
  } else {
    // not empty!
    return false;
  }
}
empty = new LinkedList();
// console.log(isEmpty(empty));
// console.log(isEmpty(sll));

// findPrevious: finds the node before the item you are looking for

function findPrev(sll, item) {
  // start at the head  
  let prevNode = null;
  let currNode = sll.head;

  // check to current node is not the same as key and is not null
  while(currNode !== null && currNode.value !== item){
    prevNode = currNode;
    currNode = currNode.next;
  }

  return prevNode;
}
console.log(findPrev(sll, 'Boomer'));

//findLast: returns the last node in the linked list

function findLast(sll) {
  //IF IT EQUALS NULLLLLLLLL
  if(sll.head === null) {
    return 'List is empty girl'
  }
  
  let newNode = sll.head;
  while(newNode.next !== null){
    newNode = newNode.next
  }
  return newNode;
}
//console.log(findLast(sll));

