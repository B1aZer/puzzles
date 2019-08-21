// MANUAL DEBUGGING
//
//i/[0,1,2,3,4,5,6,7]
//1/[4,1,6,4,7,0,1,2]
//2/[1,4,6,4,7,0,1,2]
//3/[1,4,6,4,7,0,1,2]
//4/[1,4,4,6,7,0,1,2]
//5/[1,4,4,6,7,0,1,2]
//6/[0,1,4,4,6,7,1,2]
//7/[0,1,1,4,4,6,7,2]
//8/[0,1,1,2,4,4,6,7]
const insSort = arr => {
	//1/ i = 1
  //2/ i = 2
  //3/ i = 3
  //5/ i = 5
  for (let i = 1; i < arr.length; i++) {
  	//1/ min = 1
    //2/ min = 6
    //3/ min = 4
    //5/ min = 0
  	let min = arr[i];
    let j;
    let rep = false;
    if (typeof(min) === 'undefined') {
    	arr.splice(i, 1);
     	i--;
      continue;
    }
    //1/ j = 0
    //2/ j = 1
    //2/1 j = 0
    //3/ j = 2
    //3/1 j = 1
    //3/2 j = 0
    //5/ j = 4
    //5/1 j = 3
    //5/4 j = 0
    for (j = i - 1; j >= 0 && min < arr[j]; j--) {
    	//1/  1 < 4
      //2/  6 < 4
      //2/1 6 < 1
     	//3/  4 < 6
      //3/1 4 < 4
      //3/2 4 < 1
      //5/  0 < 7
      //5/1 0 < 6
      //5/4 0 < 1
      if (min < arr[j]) {
      	//1/ 1, j = 1 => 4
        //3/ 4,j = 3 => 6
        //5/ arr[5] = 7
        //5/1 arr[4] = 6
        //5/4 arr[1] = 1
        arr[j + 1] = arr[j];
        //3/ rep = 2
        //5/ rep = 4
        //5/1 rep = 3
        //5/4 rep = 0
        rep = j;
      }
    }
    arr[j + 1] = min;
  }
  return arr;
}

console.assert(insSort([4,1,6,4,7,0,1,2]).toString() === [0,1,1,2,4,4,6,7].toString(), insSort([1,4,5,6,7,0,1,2]));
console.assert(insSort([6,3,5,,1]).toString() === [1,3,5,6].toString(), insSort([6,3,5,,1]));
