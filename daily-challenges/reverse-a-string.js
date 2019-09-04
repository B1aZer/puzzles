let a = 'home sweet home!';
function reverse(a) {
	let newS = '';
  //why??
  let sLen = a.length - 1;
  while (sLen >= 0) {
  	let letter = a[sLen];
    let endW = null;
  	if (letter.match(/[a-z\!@#]/)) {
    	endW = sLen;
      while (a[sLen] !== ' ' && sLen >= 0) {
      	sLen--;
      }
      let wordReadPos = sLen+1;
      while(wordReadPos <= endW) {
      	newS += a[wordReadPos++];
      }
    } else {
    	newS += a[sLen--];
    }
	}

	return newS;
}
console.assert(reverse(a) === 'home! sweet home', reverse(a));
console.info('Hooray!');
