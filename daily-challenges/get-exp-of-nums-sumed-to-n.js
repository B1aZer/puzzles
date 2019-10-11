function getExpsOfSum123(n) {
	let arr = [];
  getExps(n, 1, arr);
  return arr;
}

function getExps(n, exp, arr) {
	if (exp>n) {
  	return;
  }

  //             1          0                 0
  //             0          1                 0
  //             0          0                 1
  for (let i=0; i<8; i++) {
  for (let j=0; j<n; j++) {
    let exp3 = (i | (1 << 2)) === i ? exp + j : exp - 1;
    let exp2 = (i | (1 << 1)) === i ? exp + j : exp - 1;
    let exp1 = (i | (1 << 0)) === i ? exp + j : exp - 1;
    if (Math.pow(1, exp1) + Math.pow(2, exp2) + Math.pow(3, exp3) === n) {
      arr.push([exp1, exp2, exp3]);
    }
  }
  }
  return getExps(n, exp + 1, arr);
}

console.assert(getExpsOfSum123(4) === [[0,1,0]], getExpsOfSum123(4));
console.assert(getExpsOfSum123(4) === [[0,1,0]], getExpsOfSum123(24));
