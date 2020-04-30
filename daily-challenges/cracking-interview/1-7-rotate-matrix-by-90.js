let matrix = [
  [1,0,1,1,1],
  [1,0,1,1,1],
  [1,0,1,0,1],
  [1,0,1,0,1],
  [1,0,1,0,1],
]

let rotateMatrixBy90 = (matrix) => {
  const rotatedMatrx = new Array(matrix.length).fill(0).map(el => []);
  matrix.forEach((rowEl, i) => {
    rowEl.forEach((columnEl, j) => {
      rotatedMatrx[matrix.length - 1 - j].push(columnEl);
    });
  });
  return rotatedMatrx;
}

let rotateMatrixInPlace = (m) => {
  for (let i=0; i< Math.floor(m.length / 2); i++) {
    let first = i;
    let last = m.length - 1 - i;
    for (let j=first; j < last; j++) {
      let offset = j - first;
      let top = m[first][j];
      m[first][j] = m[first+offset][last];
      m[first+offset][last] = m[last][last-offset];
      m[last][last-offset] = m[last-offset][first];
      m[last-offset][first] = top;
    }
  }
  return m;
}
