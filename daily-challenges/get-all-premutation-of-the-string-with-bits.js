function getSetCahrs(int) {
let chars = {
	0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
}
let charRet = '';
	for (let i = 0; i < 7; i++) {
  	//if (((1 << i)&int)) {
    if (((1 << i)|int) === int) {
    	charRet += chars[i];
    }
  }
  return charRet;
}

function allSubsOf(str) {
	let len = str.length;
  let maxLen = Math.pow(2, len);
  if (!len) {
  	return '';
  }
  let arrRet = [];
  for (let i=0; i<maxLen; i++) {
  // 0 => ''
  // 1 => 'a'
  // 2 => 'b'
  // 3 => 'ab'
  	arrRet.push(getSetCahrs(i));
  }
  return arrRet.join('</br>');
}

document.write(allSubsOf('abcd'));
