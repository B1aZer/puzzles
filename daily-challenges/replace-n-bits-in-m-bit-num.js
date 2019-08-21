let m = 0b1000000000000;
let n = 0b111101;

function ins(m,v,ind1,ind2) {
	return parseint(m.toString(2).substring(0, ind2 - 1) + v.toString(2) + m.toString(2).substring(m.toString(2).length - ind1, m.toString(2).length), 2);
}

console.assert(ins(m,n,2,6) === 0b1000011110100, ins(m,n,2,6));
