class Graph {
	constructor() {
  	this.adj = new Map();
  }
  // defineProperty to bind this
  //addVertex(v) {
  // 	this.adj.set(a, []);
  //}
  addEdge(v, e) {
  	this.adj.get(v).push(e);
    //reverse edge
    this.adj.get(e).push(v);
  }
  bfSearch(startingNode) {
  	let self = this;
  	let queue = [];
    let visited = {};
    queue.push(startingNode);
    while (queue.length) {
    	let node = queue.shift();
    	if (visited[node]) continue;
      console.info(node);
      visited[node] = true
      let adjs = self.adj.get(node);
    	for (let adj of adjs) {
      	queue.push(adj);
      }
    }
	}
  dfSearch(startingNode) {
  	//wrong node may not have edges
  	//return this.adj.has(a);
    let visited = {};
    let self = this;

    const makeSearch = (startingNode) => {
    	if (visited[startingNode]) return;
      console.info(startingNode);
      visited[startingNode] = true;
      let adjs = self.adj.get(startingNode);
      for (let adj of adjs) {
          makeSearch(adj);
      }
    }
    makeSearch(startingNode);
  }
  printAll() {
  	for (let [i,v] of this.adj) {
    	for (let j of v) {
      	console.info(i, j)
      }
    }
  }
}

Object.defineProperty(Graph.prototype, 'addVertex', {
  get: function() {
    let self = this;
  	return function(a) {
    	self.adj.set(a, []);
    };
  }
});

const g = new Graph();
var vertices = ['A','B','C','D','E','F'];

vertices.forEach(g.addVertex);

g.addEdge('A','B');
g.addEdge('A','D');
g.addEdge('A','E');
g.addEdge('B','C');
g.addEdge('D','B');

//g.printAll();
g.bfSearch('A');
