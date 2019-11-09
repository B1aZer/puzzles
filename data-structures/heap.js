class Heap {
	constructor() {
  	this.lst = [];
  }
  insert(a) {
  	let self = this;
    function switchBetween(tailIndex, prevIndex) {
    	let oldV = self.lst[prevIndex];
      self.lst[prevIndex] = self.lst[tailIndex];
      self.lst[tailIndex] = oldV;
    }
    function getParentIndexOf(elIndex) {
    	if (elIndex % 2 === 0) {
      	return (elIndex - 2) / 2;
      }
      return (elIndex - 1) / 2;

    }
  	function siftUp() {

    	let tailIndex = self.lst.length - 1;
      let prevIndex = getParentIndexOf(tailIndex);

      while (self.lst[tailIndex] > self.lst[prevIndex]) {
      	switchBetween(tailIndex, prevIndex);
        tailIndex = prevIndex;
     		prevIndex = getParentIndexOf(tailIndex);
      }
    }
    this.lst.push(a);
		siftUp();
  }
}

let heap = new Heap();
heap.insert(1);
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(6);
heap.insert(10);
console.info(heap.lst);

