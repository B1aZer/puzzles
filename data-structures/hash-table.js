class HashTable {

  constructor() {
    this.arrT = new Array(30);
  }
  set(k, v) {
  	const index = HashTable.hashF(k) % this.arrT.length;
    // change to arr for collisions
  	this.arrT[index] = this.arrT[index] ? this.arrT[index] : new Map();
    this.arrT[index].set(k, v);
  }
  get(k) {
  	const index = HashTable.hashF(k) % this.arrT.length;
    return this.arrT[index].get(k);
  }
  static hashF(k) {
  // only ints
  	return +k * 10;
  }
}

const b = new HashTable();
b.set('1', 1);
b.set('2', 2);
// collision
b.set('4', 3);
let res = b.get('1');
res = b.get('2');
res = b.get('4');
