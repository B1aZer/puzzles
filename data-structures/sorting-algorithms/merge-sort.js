let globalArray = [];
globalArray.insert = function(item, index) {
	//let replacedItem = this[index];
  this.length += 1;
  //this[index] = item;
  // [0,1]
  // 3 - 1 = 2; 2 >= 1; 1--
  for (let i = this.length - 1; i>= index; i--) {
  	this[i] = this[i - 1];
  }
  this[index] = item;
}

function mergeSort(arr) {
	//  splettedEls = [[8], [4], [5], [3], [2], [1]]
	splitElements(arr);
  return globalArray;
}

function compose(item) {
	if (globalArray.length) {
  	let i;
  	for (i=globalArray.length - 1; i>=0; i--) {
      let curItm = globalArray[i];
      if (curItm < item) {
        break;
      }
    }
    globalArray.insert(item, i+1);
  } else {
  	globalArray.push(item);
  }
}

// MANUAL DEBUG
// arr = [8,4,5,3,2,1]
// arr = [8,4,5]
// arr = [8,4]
// arr = [8]
function splitElements(arr) {
 if (arr.length <= 1) {
 		return compose(arr[0]);
 }
 //  middle = (6 % 2 === 0 ? 3 : null) === 3
 //  middle = (3 % 2 === 0 ? 3 : 1.5+0.4) === 2
 //  middle = (2 % 2 === 0 ? 1 : null) === 1
 let middle = arr.length % 2 === 0 ? arr.length / 2 : arr.length / 2 + 0.5;
 //  left = getContentsFromTo([8,4,5,3,2,1], 0, 2);
 //  left = getContentsFromTo([8,4,5], 0, 1);
 //  left = getContentsFromTo([8,4], 0, 0);
 let left = getContentsFromTo(arr, 0, middle - 1);
 //  right = getContentsFromTo([8,4,5,3,2,1], 3, 5);
 //  right = getContentsFromTo([3,2,1], 2, 2);
 //  right = getContentsFromTo([8,4], 1, 1);
 let right = getContentsFromTo(arr, middle, arr.length - 1);
 // [8,4,5]
 // [8,4]
 // [8]
 splitElements(left);
 // [3,2,1]
 // [5]
 // [4]
 splitElements(right);
}

//[8,4,5,3,2,1], 0, 2);
//[8,4,5,3,2,1], 3, 5);
function getContentsFromTo(arr, startI, endI) {
	let resArr = [];
  // 3; 3 <= 5; 3;
  // 3; 4 <= 5; 4;
  // 3; 5 <= 5; 5;
	for (let i = startI; i <= endI; i++) {
  	// 8,4,5
  	resArr.push(arr[i]);
  }
  // [8,4,5]
  return resArr;
}


console.assert(mergeSort([8,4,5,3,2,1]).toString() === [1,2,3,4,5,8].toString(), mergeSort([8,4,5,3,2,1]));
