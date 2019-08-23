// MANUAL DEBUG
// [1,2,3,4,5,6], 5, 4
Array.prototype.insert = function(el,pos) {
	this.length += 1;
  //[1,2,3,4,5,6, ]
  //i = 6; i > 4;
  for (let i = this.length - 1; i > pos; i--) {
  	this[i] = this[i-1];
  }
  this[pos] = el;
  this.pop();
}

// 						[3,1,6,5,4,2], 0, 5
//						[1,3,6,5,4,2]
//						[1,2,3,6,5,4], 2, 5
//            [1,2,3,4,6,5], 4, 5
//            [1,2,3,4,5,6]
function prepartition(arr, start, end) {
	// i = 4; pivot = 5
	let i = start; let pivot = end;
  // i = 3
  i--;
  if (start === end || start > end) {
  	return;
  }
  // j = 4; j < 5; 
  for (let j = start; j < end; j++) {
  	// 6 < 5
  	if (arr[j] < arr[pivot]) {
    // i = 2
    	i+= 1;
      // safe = 3
      let safe = arr[j];
      // arr[2] = 3
      arr[j] = arr[i];
      // arr[2] = 3
      arr[i] = safe;
    }
  }
  // 5, 4
  arr.insert(arr[pivot], i+1);
  // arr, 4, 3
  prepartition(arr, start, i);
  // arr, 5, 5
  prepartition(arr, i+2, end);
}

let arr = [3,1,6,5,4,2];
prepartition(arr, 0, 5);
console.info(arr);
