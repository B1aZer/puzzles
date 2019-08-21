class Queue {
	constructor() {
  	this.arr = [];
  }
  enq(itm) {
  	this.arr.push(itm);
  }
  deq() {
  	return this.arr.shift();
  }
  count() {
  	return this.arr.length;
  }
}

let graph = {
	root: {
  	id: 1,
  	adjusted_items: [
    	{
      	id:2,
      	adjusted_items: [
        	{
          	id: 3,
          	adjusted_items: []
          },
          {
          	id: 4,
          	adjusted_items: []
          }
        ]
      },
      {
       	id: 5,
        adjusted_items: []
      }
    ]
  }
}

function grSearch(graph) {
	let q = new Queue();
  q.enq(graph.root);

  while(q.count()) {
  	let item = q.deq();
    item.visited = true;
    for (let ad of item.adjusted_items) {
    	if (!ad.visited) {
      	q.enq(ad);
      }
    }
  }
}

console.log(graph);
grSearch(graph);
console.log(graph);
