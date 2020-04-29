// Hash table with linear probing
// Hash table data is exposed

class HashTable {
	constructor() {
  	this.keys = {};
  }
  set(k, v) {
  	let h = this.hash(k);
		while (this.keys[h]) {
     	h += 1;
    }
    this.keys[h] = {value: v, key: k};
	}
  get(k) {
  	let h = this.hash(k);
  	let assoc = this.keys[h];
    if (!assoc) {
    	return undefined;
    }
    while (this.keys[h] && this.keys[h].key !== k) {
    	h += 1;
    }
    return this.keys[h].value;
  }
  hash(s) {
  	s = (s).toString();
 		for (var i = 0, h = 0; i < s.length; i++) {
    	h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    }
    // returning last digit to make collisions
    return h .toString().substring(h.toString().length - 1) | 0;
  }
}

let h = new HashTable();
new Array(20).fill(0).map((x,i) => i).forEach(x => h.set(x, x*2));
// should not work
console.log(h.keys)
console.log(h.get(9));
console.log(h.get(10));

// Hash table data is hiden inside constructor

gg
