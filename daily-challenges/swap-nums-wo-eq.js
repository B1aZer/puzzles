function swapXor(/* int& */ a, /* int& */ b) {
  a ^= b;
  b ^= a;
  a ^= b;
}

function swapTemp(/* int& */ a, /* int& */ b) {
  let temp = a;
  a = b;
  b = temp;
}
