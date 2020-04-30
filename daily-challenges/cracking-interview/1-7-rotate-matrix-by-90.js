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
