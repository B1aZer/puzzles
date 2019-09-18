function convertInt(/* int */ int, base = 4) {
  if (int < base) {
  	return '' + int;
  }

  let strRet = int % 4;

  int /= base;
  int = Math.floor(int);

 	let inStr = convertInt(int, base);

  strRet = '' + inStr + strRet;

  return strRet;
}

function countNumberOfDigitsEfficient(/* int */ int, base = 4) {
 	strRet = Math.floor(Math.log(int) / Math.log(base)) + 1;
  return strRet;
}

console.info(convertInt(49, 4));
console.info(countNumberOfDigitsEfficient(49, 4));
