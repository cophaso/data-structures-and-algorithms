const Memory = require('./memory');
const memory = new Memory;

class Array {
  constructor(size){
    // Initializing an empty Array
    this.ptr = memory.allocate(size);
    this.length = 0;
    this._capacity = size;
  }

  printMemory(){
    return `[${memory.memory}]`;
  }

  printArray(){
    if(this.length === 0)
      return '[]';

    let arr = '[';
    for(let i = 0; i < this.length; i++){
      arr += memory.get(i)
      if(i !== this.length-1)
        arr += ',';
    }
    arr += ']';
    return arr;
  }

  push(value){
    if (this.length >= this._capacity) {
        this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  } // best/average case: constant time O(1); worst case: linear time O(n)

  _resize(size){
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
        throw new Error('Out of memory');
    }
    //console.log(this.ptr, oldPtr, this.length);
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
        throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
  }

  print(){
    let i=this.ptr;

    //console.log(this.ptr, this._capacity);
    while(i < this.ptr + this._capacity){
      console.log(memory.get(i));
      i++
    }
  }
}

module.exports = Array;
