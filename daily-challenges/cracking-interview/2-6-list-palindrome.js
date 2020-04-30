class LinkedList {

	constructor() {
  	this.head = null;
  }
  unshift(listVal) {
  	let listEl = new ListElement(listVal);
    listEl.next = this.head;
    this.head = listEl;
    // return new element
    return this.head;

  }
  erase(idx) {
  	let counter = 0;
    let prevItem = null;
    let tail = this.head;
    while (tail.next && counter < idx) {
   		counter++;
    	prevItem = tail;
    	tail = tail.next;
    }
 		prevItem.next = tail.next;
    return tail;
  }
  shift() {
  	let reObj = this.head;
    this.head = this.head.next;
    return reObj;
  }
	push(listVal) {

    let listEl = new ListElement(listVal);
    let tail = this.head;
    if (!tail) {
    	this.head = listEl;
    }
    while (tail.next) {
    	tail = tail.next;
    }
    tail.next = listEl;
    return listEl;
  }
  pop() {
  	let tail = this.head;
    let preT = null;
    while (tail.next) {
    	preT = tail;
    	tail = tail.next;
    }
    let reObj = tail;
		preT.next = null;
    return reObj;
  }
  getByIndex(idx) {
  	let counter = 0;
    let el = this.head;
    while (counter !== idx) {
    	counter++;
      el = el.next;
    }
    return el;
  }
  isPalindrome() {
  	// can be used as function parameters
    // works as closure and prevents optimization of stack
  	let left = [];
    let length = 0;
    let isPal = true;
  	let isPalRecursive = (el, i) => {
      i += 1;
      if (!el) {
      	// start checking str[last] === str[first]
        // return if not equal
        // return if on the middle
        length = i;
      	return;
      }
      left.push(el.value);
      isPalRecursive(el.next, i);
      if (i > Math.floor(length / 2)) {
      	isPal = isPal && (left[length - i - 1] === el.value);
      }
      return;
    };
    isPalRecursive(this.head, -1);
  	return isPal;
  }
}

class ListElement {

	constructor(value, next=null) {
  	this.value = value;
    this.next = next;
  }
}

function linkedListToList(llHead) {
	if (!llHead) {
  	return [];
  }
  return [llHead.value].concat(linkedListToList(llHead.next));

}

let list = new LinkedList();

list.unshift(42);
list.unshift(2);
list.unshift(1);
list.unshift(2);
list.unshift(42);

console.info(list.isPalindrome());
console.info(linkedListToList(list.head));


