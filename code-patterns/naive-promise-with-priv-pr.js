class Promise {
	#queue;
	constructor(fn) {
  	let self = this;
  	this.#queue = [];
    setTimeout(function() {
  	fn(Promise.resolve.bind(self), Promise.reject);
    });
    return this;
  }
  static resolve(val) {
  	return this.#queue.reduce((acc, fn) => {
    	acc = fn(acc);
      return acc;
    }, val);
  }
  static reject() {

  }
  then(fn) {
  	this.#queue = [...this.#queue, fn];
  	return this;
  }
  catch() {

  }
  finally() {

  }
}

new Promise((res, rej) => {
	res(1);
})
.then((x) => {console.log(x); return x;})
.then((x) => {console.log(x); return x;})
.then((x) => {console.log(x); return x;});
