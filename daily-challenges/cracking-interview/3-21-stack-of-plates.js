class SetOfStacks {
	constructor() {
  	this.maxLen = 2;
    this.stacks = [];
    this.len = 0;
  }
  leftShift() {
    // shift values to left
  }
  getStack(i) {
  	if (i >= 0) {
      this.leftShift();
    	return this.stacks[i];
    }
    return this.stacks[Math.floor(this.len / this.maxLen)];
  }
	push(v) {
  	let s = this.getStack();
    if (!s) {
    	this.stacks.push([]);
      s = this.stacks[this.stacks.length - 1];
    }
    this.len += 1;
    return s.push(v);
  }
  pop(iOfSubstack) {
  	this.len -= 1;
  	let s = this.getStack(iOfSubstack);
    return s.pop();
  }
}
