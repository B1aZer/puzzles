class Node {
	constructor(value) {
  	this.value = value;
    this.children = [];
    this.parent = null;
  }
  insert(value) {
  	this.children.push(new Node(value));
  }
}

let x = new Node(1);
x.insert(2);
console.info(x.children);
