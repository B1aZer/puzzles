class Node {
	constructor(value) {
  	this.value = value;
    this.left = null;
    this.right = null;
  }
}

let root;
function constructFrom(arr, el=null, start=0, end=arr.length, orr=null) {
  if (start >= end) {
  // probably can be refactored
  	(el.value !== arr[start] && arr[start]) ? el[orr] = new Node(arr[start]) : null;
    return;
  }
  let middle = ((end - start) % 2 === 0 ? (end - start) / 2: (end - start + 1) / 2) - 1 + start;
  if (!el) {
    el = new Node(arr[middle]);
    root = el;
  } else {
  	//el = findEmpty(el);
    if (middle >= el.value) {
      el.right = new Node(arr[middle]);
      el = el.right;
    } else {
      el.left = new Node(arr[middle]);
      el = el.left;
    }
  }
  constructFrom(arr, el, start, middle - 1, 'left');
  constructFrom(arr, el, middle + 1, end, 'right');
}

function getCommonAncestorOf(root, x1, x2) {
  while (root !== null) {
  	if (root.value > x1 && root.value > x2) {
    	root = root.left;
    } else if (root.value < x1 && root.value < x2) {
    	root = root.left;
    } else {
    	return root;
    }
  }
}

let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
constructFrom(arr);
console.info(root);
console.info(getCommonAncestorOf(root, 14, 8));
