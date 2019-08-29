class LinkedList {

	constructor() {
  	this.head = null;
  }
  shift(listVal) {
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
  unshift() {
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


list.shift(42);
console.info(linkedListToList(list.head));
list.shift(2);
console.info(linkedListToList(list.head));
list.push(3);
console.info(linkedListToList(list.head));
console.info(list.pop());
console.info(linkedListToList(list.head));
console.info(list.unshift());
console.info(linkedListToList(list.head));
list.push(3);
list.push(1);
list.push(2);
console.info(linkedListToList(list.head));
console.info(list.getByIndex(2));
list.erase(2);
console.info(linkedListToList(list.head));
