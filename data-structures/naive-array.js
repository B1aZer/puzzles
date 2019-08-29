// User defined class Array
class Array {

    // Create constructor
    constructor() {

        // It store the length of array.
        this.length = 0;

        // Object to store elements.
        this.data = [];
    }

    insertAt(idx, value) {
    	for (let i = this.length; i> idx; i--) {
      	this.data[i] = this.data[i - 1];
      }
    	this.data[idx] = value;
      this.length +=1 ;
    }
}

let arr = new Array();
