// python has convenient function range that creates a list of items, we can do
// the same in js

const n = 10;
const arr = new Array(n).fill(0).map((el, i) => i);

// be aware that

const arr1 = new Array(n).fill([])

// will fill with reference of array and not multiple arrays
// so any mutation will be reflected
