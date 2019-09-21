class LinkedItem {
	constructor(val) {
  	this.next = null;
    this.prev = null;
    this.value = val;
    this.index = null;
  }
}

class LinkedList {
	constructor() {
  	this.size = 0;
    this.head = null;
    this.tail = null;
    this.currentEl = null;
  }
	add(itm) {
  	itm = new LinkedItem(itm);
  	if (this.head) {
    	this.head.next = itm;
      itm.prev = this.head;
    } else {
    	this.tail = itm;
    }
    this.head = itm;
    this.head.index = this.size;
    this.size += 1;
    // circular on 1 element
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  showCurrentValue() {
    return this.currentEl.value;
  }
  removeCurrent() {
  	this.currentEl.prev.next = this.currentEl.next;
    this.currentEl.next.prev = this.currentEl.prev;
    this.currentEl = this.currentEl.next;
    this.size -= 1;
  }
  setCurrent(index) {
  	let el = this.tail;
  	while (index !== el.index) {
      el = el.next;
    }
    this.currentEl = el;
  }
  next() {
  	this.currentEl = this.currentEl.next;
  }
}


let lst = new LinkedList();
let tmpArr = [...Array(7).keys()];
// removing 0
tmpArr.shift();
tmpArr.forEach(x => {lst.add(x)});
// start from 1
lst.setCurrent(0);
let result = getJfrom(lst);

function getJfrom(lst) {
	if (lst.size === 1) {
		return lst.showCurrentValue();
	}
	lst.next();
  lst.removeCurrent();
  return getJfrom(lst);
}

console.assert(result === 5, result);
console.info('Hooray');
