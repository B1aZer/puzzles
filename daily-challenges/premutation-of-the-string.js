function premStr(str) {
	let inStr = str;
  let out = '';
  let length = str.length;
  let used = {};
	return doPrem(inStr, out, length, used, 0);
}

function doPrem(inStr, out, length, used, level) {
	if (level === length) {
  	console.log(out);
  	return;
  }
  for (let i=0; i< length; i++) {
    if (used[inStr[i]]) {
     continue;
    }
  	used[inStr[i]] = true;
    out += inStr[i];
    doPrem(inStr, out, length, used, level+1);
    used[inStr[i]] = false;

    //remove last character
    out = out.slice(0, level);
  }
}

premStr('abcd');
