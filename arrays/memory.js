//ptr is shorthand for pointer: variables containing memory addresses are known as pointers

class Memory {
    constructor(size) {
      this.memory = new Float64Array(size);
      this.head = 0;
    }


  //reserves a contiguous block of memory consisting of size boxes which you can safely modify, returning a pointer to the 1st box or null if the allocation fails
    allocate(size) {
      // set size for the array in memory and increase size once
      // the array is full
      if(this.head + size > this.memory.length){
      const newMemory = new Float64Array(size);
      for(let i = 0; i < this.memory.length; i++)
        newMemory[i] = this.memory[i]

      this.memory = newMemory;
    }

    return 0;
    }
  
  //frees the block of memory reserved using allocate
  free(ptr) {}

  get(ptr){
    // return the value in memory at a given pointer
    this._checkIndexOutOfBounds(ptr)
    return this.memory[ptr];
  }

  set(ptr, value){
    // set the value in memory at a given pointer
    this._checkIndexOutOfBounds(ptr);
    this.memory[ptr] = value;
  }
  
  //copies size boxes of data from the from pointer to the to pointer (for example, copy(10, 0, 3) would copy the values at boxes 0, 1 and 2 to the boxes at 10, 11 and 12 respectively)
  copy(toIdx, fromIdx, size) {
    if (fromIdx === toIdx) {
      return;
    }

    if (fromIdx > toIdx) {
      // Iterate forwards
      for (let i = 0; i < size; i++) {
        this.set(toIdx + i, this.get(fromIdx + i));
      }
    } else {
      // Iterate backwards
      for (let i = size - 1; i >= 0; i--) {
        this.set(toIdx + i, this.get(fromIdx + i));
      }
    }
  }

  // checks for pointer to be in boundaries
  // else throw an error
  _checkIndexOutOfBounds(ptr){
    if(ptr < 0 || ptr > this.memory.length)
      // throw new Error `Index out of bounds`;
      console.log(`Index out of bounds`)
  }
}
  
module.exports = Memory;