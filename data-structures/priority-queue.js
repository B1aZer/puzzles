class El {
	constructor(v, p=0) {
  	this.value = v;
    this.priority = p;
  }
}
class pQueue {
	constructor() {
  	this.lst = [];
  }
	isEmpty() {
  	return this.lst.length === 0;
  }
  insertWithPriority(v, p) {
  	let elI = this.lst.findIndex(el => el.priority < p);
    if (elI === -1) {
    	this.lst.push(new El(v,p));
    } else {
    	this.lst = [...this.lst.slice(0, elI), new El(v,p), ...this.lst.slice(elI)];
    }

  }
  pullHighestPriorityEl() {
  	let el = this.lst.shift();
    return el;
  }
  peek() {
  	return this.lst[0];
  }
}

let pq = new pQueue();
pq.insertWithPriority({p: 3}, 3);
pq.insertWithPriority({p: 31}, 3);
pq.insertWithPriority({p: 32}, 3);
pq.insertWithPriority({p: 33}, 3);
pq.insertWithPriority({p: 1}, 1);
pq.insertWithPriority({p: 4}, 4);
console.info(pq.lst);
console.info(pq.pullHighestPriorityEl());
console.info(pq.lst);
