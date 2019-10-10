class Node {
	constructor(value) {
  	this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
	constructor() {
  	this.root = null;
    this.current = null;
    this.queue = [];
  }
	insert(value) {
  	if (!this.root) {
    	this.root = new Node(value);
    } else {
    	let el = this.findEmtyFromLeftToRightFrom(this.root);
      if (el.left === null) {
      	el.left = new Node(value);
      } else if (el.right === null) {
      	el.right = new Node(value);
      }
    }
  }
  findEmtyFromLeftToRightFrom(el) {
  	if (el.left === null) {
    	this.queue = [];
 			return el;
    } else {
   		this.queue.push(el.left);
    }
    if (el.right === null) {
    	this.queue = [];
    	return el;
    } else {
   	 	this.queue.push(el.right);
    }
    let newEl = this.queue.shift();
    return this.findEmtyFromLeftToRightFrom(newEl);
  }
  height(el) {
  	if (!el.left) {
    	return 1;
    }
  	return 1 + this.height(el.left);
  }
  map(lol) {
    let queue = [];
    queue.push(this.root);
    while (queue.length) {
    	let el = queue.shift();
      el.value = lol(el.value);
      el.right && queue.unshift(el.right);
      el.left && queue.unshift(el.left);
    }
  }
  bfsPath(val) {
  	let el = this.root;

    function search(el, val, path=[]) {
    	if (el === null) {
      	return;
      }
      if (el.value === val) {
      	return path;
      }
      path = [...path, el.value];
      //TODO track all path from all nodes
      // we need to track only pfrom parent
      return search(el.left, val, path) || search(el.right, val, path);
    }
    return search(el, val);
  }
  lowestCommonAncestor(value1, value2) {
  	let x1 = this.bfsPath(value1);
    let x2 = this.bfsPath(value2);
    if (x1 && x2) {
    	return x1.filter(x => x2.includes(x)).pop();
    }
    return null;
    //instersction of x1 | x2 => x3[0]
  }
}

let tree = new Tree();

tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);

tree.map((x) => x * 2);
console.info(tree.lowestCommonAncestor(10,8));
