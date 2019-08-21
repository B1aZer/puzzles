class minV {
	constructor(value) {
  	this.value = value;
    this.localMin = null;
  }
}

class LinkedListWithMin {
	// by value, more acc by position
	constructor() {
  	this.lst = [];
    this.minV = null;
  }
  push(item) {
  	const minItem = new minV(item);
    minItem.localMin = this.minV;
    if (this.minV === null) {
    	this.minV = item;
    } else if (item < this.minV) {
    	this.minV = item;
    }
  	this.lst.push(minItem);
  }
  pop() {  	
  	const minItem = this.lst.pop();
    if (minItem.value <= this.minV) {
    	this.minV = minItem.localMin;
    }
    return minItem.value;
  }
  min() {
  	return this.minV;
  }
}

const lst = new LinkedListWithMin();
lst.push(3);
console.assert(lst.min() === 3, lst.min());
lst.push(2);
console.assert(lst.min() === 2, lst.min());
lst.push(1);
console.assert(lst.min() === 1, lst.min());
lst.push(1);
console.assert(lst.min() === 1, lst.min());
lst.push(5);
console.assert(lst.min() === 1, lst.min());
lst.push(0);
console.assert(lst.min() === 0, lst.min());
lst.push(5);
console.assert(lst.min() === 0, lst.min(), "test");
lst.push(-1);
console.assert(lst.min() === -1, lst.min());
let test = lst.pop();
console.info(test === -1);
console.assert(lst.min() === 0, lst.min());
lst.pop();
console.assert(lst.min() === 0, lst.min());
lst.pop();
console.assert(lst.min() === 1, lst.min());
lst.pop();
console.assert(lst.min() === 1, lst.min());
lst.pop();
console.assert(lst.min() === 1, lst.min());
lst.pop();
console.assert(lst.min() === 2, lst.min());
lst.pop();
console.assert(lst.min() === 3, lst.min());
test = lst.pop();
console.info(test === 3);
console.assert(lst.min() === null, lst.min());
