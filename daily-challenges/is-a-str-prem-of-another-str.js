function isPrem(str, ofStr) {
 let byteStr = 0;
 let byteStrOfStr = 0;
 for (let s of str) {
   let code = s.charCodeAt();
   byteStr = byteStr | 1 << code;
 }
 for (let s of ofStr) {
   let code = s.charCodeAt();
   byteStrOfStr = byteStrOfStr | 1 << code;
 }
 return (byteStr | byteStrOfStr) === byteStrOfStr;
}

console.info(isPrem('ab', 'abc') === true);
console.info(isPrem('abc', 'abc') === true);
console.info(isPrem('nor', 'abcde') === false);
