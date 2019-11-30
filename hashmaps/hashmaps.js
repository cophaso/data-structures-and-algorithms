
/*
1. Create a HashMap class
Walk through the HashMap implementation in the curriculum and understand it well. Then write a HashMap class and its core functions with open addressing as the collision resolution mechanism. */

class HashMap {
  constructor(initalCapacity = 8){
      this.length = 0; //initial length of hashtable
      this._hashTable = []; //holds the data
      this._capacity = initalCapacity; //will grow in chunks as we resize
      this._deleted = 0;
  }

  get(key) {//access key values from hashtable
      const index = this._findSlot(key);
      if (this._hashTable[index] === undefined) {
          throw new Error('Key error');
      }
      return this._hashTable[index].value;
  }

  //methods for locating and adding an item to the hashmap
  set(key, value){
      const loadRatio = (this.length + this._deleted + 1) / this._capacity;
      if (loadRatio > HashMap.MAX_LOAD_RATIO) {//keeps track of how full the hashmap is
          this._resize(this._capacity * HashMap.SIZE_RATIO);//reduce num of collisions
      }
      //Find the slot where this key should be in
      const index = this._findSlot(key);

      if(!this._hashTable[index]){
          this.length++;
      }
      this._hashTable[index] = {
          key,
          value,
          DELETED: false
      }; 
  }

  delete(key) {
      const index = this._findSlot(key);
      const slot = this._hashTable[index];
      if (slot === undefined) {
          throw new Error('Key error');
      }
      slot.DELETED = true;
      this.length--;
      this._deleted++;
  }

  _findSlot(key) {//used to find the correct slot for a given key
      const hash = HashMap._hashString(key); //calcs. hash of key 
      const start = hash % this._capacity;//uses mod to find a slot within current capacity

      for (let i=start; i<start + this._capacity; i++) {//loops thru array stopping when it matches a key to an empty slot
          const index = i % this._capacity; //send index into hashtable 
          const slot = this._hashTable[index]; //find the slot for that index
          if (slot === undefined || (slot.key === key && !slot.DELETED)) { //slot - are you free?
              return index; //func will always return a slot as we leave extra slots due to max load factor
          }
      }
  }

  _resize(size) {//making sure each item lives in the correct place, we recreate the hash with a larger capacity
      const oldSlots = this._hashTable;
      this._capacity = size;
      // Reset the length - it will get rebuilt as you add the items back
      this.length = 0;
      this._hashTable = [];

      for (const slot of oldSlots) {
          if (slot !== undefined) {
              this.set(slot.key, slot.value);
          }
      }
  }

  static _hashString(string) { //function takes a string and hashes it giving a num
      let hash = 5381; //declared var, initialized to prime num - primes are good at uniformly dist. data
      for (let i = 0; i < string.length; i++) {//iterating thru each char in string
          hash = (hash << 5) + hash + string.charCodeAt(i);//extract and convert each char to it's num val
          //(hash << 5 - left shift) - takes hash and shifts 5 bits to left, therefore makes val of hash larger
          hash = hash & hash;//forces hash to be a fixed size (i.e. 32 bit int)
      }
      return hash >>> 0; //takes large hash val and forces it to be a +ve int, same as abs() - but time complexity will be larger
  }
}


/*Export your HashMap module
Create a .js file called HashMaps_drills. In the file import the HashMap module. Create a function called main()
-- Inside your main() function, create a hash map called `lor. 
--Add the following items to your hash map: {"Hobbit": "Bilbo"}, {"Hobbit": "Frodo"},
{"Wizard": "Gandolf"}, {"Human": "Aragon"}, {"Elf": "Legolas"}, {"Maiar": "The Necromancer"},
{"Maiar": "Sauron"}, {"RingBearer": "Gollum"}, {"LadyOfLight": "Galadriel"}, {"HalfElven": "Arwen"},
{"Ent": "Treebeard"}
-- Print your hash map and notice the length and items that are hashed in your hash map. Have you hashed all the items you were asked to?
-- Retrieve the value that is hashed in the key "Maiar" and Hobbit.
-- What are the values of Maiar and Hobbit that you have? Is there a discrepancy? Explain your answer.
What is the capacity of your hash table after you have hashed all the above items? Explain your answer.
*/

function main(){
  const lor = new HashMap();
  lor.MAX_LOAD_RATIO = 0.5;
  lor.SIZE_RATIO = 3;
  //add the data
  const lorData = [
  {'Hobbit': 'Bilbo'}, 
  {'Hobbit': 'Frodo'},
  {'Wizard': 'Gandolf'}, 
  {'Human': 'Aragon'}, 
  {'Elf': 'Legolas'}, 
  {'Maiar': 'The Necromancer'},
  {'Maiar': 'Sauron'}, 
  {'RingBearer': 'Gollum'},
  {'LadyOfLight': 'Galadriel'}, 
  {'HalfElven': 'Arwen'},
  {'Ent': 'Treebeard'}
  ];
  lorData.forEach(obj => {
      for(let key in obj)
      lor.set(key, obj[key]);
  })
  lorData.forEach(obj => {
      for(let key in obj)
       console.log(`${key}`, lor.get(key));
  });
  // console.log('capacity', lor._capacity);
  // console.log('hashtable', lor._hashTable);
  // console.log(lor._findSlot("Maiar")); 
  // console.log(lor._findSlot("Hobbit")); 
}
main();


/*2. WhatDoesThisDo
DO NOT run the following code before solving the problem.

What is the output of the following code? explain your answer.*/

const WhatDoesThisDo = function(){
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';

  let map1 = new HashMap();
  map1.set(str1,10);
  map1.set(str2,20);
  
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  
  map2.set(str3,20);
  map2.set(str4,10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
} 
WhatDoesThisDo();

// ANSWER: 
// This happens because the value gets overwritten when trying to set an item with the same key. 
// map1: { str1 = 'Hello World.' : 10 }
// map1: { str2 = 'Hello World.' : 20 }
// map2: { str3 = 'Hello World.' : 20 }
// map2: { str4 = 'Hello World.' : 10 }
// End result: 
// map1: { 'Hello World.' : 20 }
// map2: { 'Hello World.' : 10 }
// The output for 
// map1.get(str1) == map1.get('Hello World.') == 20
// map2.get(str3) == map2.get('Hello World.') == 10


/*3. Demonstrate understanding of Hash maps
*You don't need to write code for the following two drills. use any drawing app or simple pen and paper *

1) Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 into a hash map of length 11 using open addressing and a hash function k mod m, where k is the key and m is the length.

ANSWER: 
m = 11
h'(k, i) = k mod m
h(10, 0) = 10 % 11 = 10 
h(22, 0) = 22 % 11 = 0
h(31, 0) = 31 % 11 = 9
h(4, 0) = 4 % 11 = 4
h(15, 0) = 15 % 11 = 4
h(28, 0) = 28 % 11 = 6
h(17, 0) = 17 % 11 = 6
h(88, 0) = 88 % 11 = 0
h(59, 0) = 59 % 11 = 4

Key:   22, 88, 0, 0, 4, 15, 28, 17, 59, 31, 10
Index: 0 , 1 , 2, 3, 4, 5 , 6 , 7 , 8 , 9 , 10


2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions resolved by separate chaining. Let the hash table have a length m = 9, and let the hash function be k mod m. 

ANSWER: 
m = 9
h'(k, i) = k mod m
h(5, 0) = 5 % 9 = 5
h(28, 0) = 28 % 9 = 1
h(19, 0) = 19 % 9 = 1
h(15, 0) = 15 % 9 = 6
h(20, 0) = 20 % 9 = 2
h(33, 0) = 33 % 9 = 6
h(12, 0) = 12 % 9 = 3
h(17, 0) = 17 % 9 = 8
h(10, 0) = 10 % 9 = 1

index : key
  0 : 0
  1 : 28 -> 19 -> 10
  2 : 20
  3 : 12
  4 : 0
  5 : 5
  6 : 15 -> 33
  7 : 0
  8 : 17
  9 : 0
*/

/*4. Remove duplicates
Implement a function to delete all duplicated characters in a string and keep only the first occurrence of each character. For example, if the input is string “google”, the result after deletion is “gole”. Test your program with a sentence as well such as "google all that you think can think of".*/

function removeDuplicates(str) {
  const characters = new HashMap();
  for( let i = str.length - 1; i >= 0; i--) {
      characters.set(str[i], i);
  }
  let results = '';
  for (let i = 0; i < str.length; i++) {
      if ( i === characters.get(str[i])){
          results += str[i];
      }
  }
  return results;
}
console.log(removeDuplicates('google')); // reads gole 'no dupes'

/*5. Any permutation a palindrome
Write an algorithm to check whether any permutation of a string is a palindrome. Given the string "acecarr", the algorithm should return true, because the letters in "acecarr" can be rearranged to "racecar", which is a palindrome. In contrast, given the word "north", the algorithm should return false, because there's no way to rearrange those letters to be a palindrome.*/

function palindrome(string){
const hash = new Map();
let count = 0;

for (let i = 0; i < string.length; i++){
  if(!hash.has(string[i])) {
    hash.set(string[i], '');
    count++;
  } else if (hash.has(string[i])) {
    count--;
  }
}
return string.length % 2 && count === 1 ? true : string.length % 2 && count === 0 ? true : false;
}

console.log(palindrome('acecarr'));
console.log(palindrome('north'));
console.log(palindrome('dad'));

/*6. Anagram grouping
Write an algorithm to group a list of words into anagrams. For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]. */

let array = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];

function anagrams(array) {
let results = [];
let alphaHash = new HashMap();
array.forEach(word => {
  let alpha = word.split('').sort().join('');
  try {
    let index = alphaHash.get(alpha);
    results[index].push(word);
  }
  catch (e) {
    alphaHash.set(alpha, results.length);
    results.push([word]);
  }
});
return results;
}

console.log(anagrams(array));

/*7. Separate Chaining
Write another hash map implementation as above, but use separate chaining as the collision resolution mechanism.

Test your hash map with the same values from the lor hash map.*/

function splitAnagrams(array) {
let anaObject = {}
let results = []
console.log(array)
array.forEach(word=> {
  let alpha = word.split('').sort().join('');
  console.log(alpha, "this is after the for each")
  // {}
  if(!anaObject[alpha]){
    anaObject[alpha] = []
  }
  anaObject[alpha].push(word)
  console.log(anaObject, "this is after we push")
  // {"aest": []
})
 Object.keys(anaObject).forEach(key => results.push(anaObject[key]))
 return results;

}
console.log(splitAnagrams(array))

function reverseStr(str) {
return word.split('').reverse().join('')
}

console.log(splitAnagrams(array));