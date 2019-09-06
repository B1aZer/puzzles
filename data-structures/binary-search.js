function binarySearch(arr, lookup) {
	if (!arr.length) {
  	return;
  }
  return makeSearch(arr, lookup);
}

function makeSearch(arr, lookup, start = 0, end = arr.length) {
	if (end <= start) {
  	return -1;
  }
  let length = end - start;
	let pivot = length % 2 === 0 ? length / 2 : (length + 1)/ 2 - 1;
  if (arr[start + pivot] === lookup) {
    return start + pivot;
  } else if (arr[start + pivot] < lookup) {
  	// right
    return makeSearch(arr, lookup, start + pivot + 1, end);
  } else {
  	// left
    return makeSearch(arr, lookup, start, start + pivot);
  }
}

console.assert(binarySearch([1,2,3,4,5], 5) === 4, binarySearch([1], 1));
console.assert(binarySearch([1,3,4,5,6,7,8,9,10], 9) === 7, binarySearch([1,3,4,5,6,7,8,9,10], 9));
console.assert(binarySearch([1,3,4,5,6,7,8,9,10], 3) === 1, binarySearch([1,3,4,5,6,7,8,9,10], 3));
console.assert(binarySearch([1,2,3,4], 1) === 0, binarySearch([1,2,3,4], 1));
console.assert(binarySearch([1,3,4,5,6,7,8,9,10], 12) === -1, binarySearch([1,3,4,5,6,7,8,9,10], 12));
console.assert(binarySearch([1,3,4,5,6,7,8,9,10,11], 6) === 4, binarySearch([1,3,4,5,6,7,8,9,10], 6));
console.info('Hooray');
