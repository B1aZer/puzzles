Given a  2D Array, :

```
1 1 1 0 0 0
0 1 0 0 0 0
1 1 1 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
```

We define an hourglass in  to be a subset of values with indices falling in
this pattern in 's graphical representation:

```
a b c
  d
e f g
```

There are  hourglasses in , and an hourglass sum is the sum of an hourglass'
values. Calculate the hourglass sum for every hourglass in , then print the
maximum hourglass sum.

For example, given the 2D array:

We calculate the following  hourglass values:

```
-63, -34, -9, 12, 
-10, 0, 28, 23, 
-27, -11, -2, 10, 
9, 17, 25, 18
```

Our highest hourglass value is  from the hourglass:

```
0 4 3
  1
8 6 6
```

```js
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the hourglassSum function below.
function hourglassSum(arr) {
    let maxSum = -Infinity;
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            let sum = findSum(arr, x, y);
            maxSum = sum > maxSum ? sum : maxSum;
        }
    }
    return maxSum;
}

function findSum(matrix, x, y) {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
        for (let ii = 0; ii < 3; ii++) {
            if ((i === 1 && ii === 0)
                || (i === 1 && ii === 2)) {
                    //pass
                } else {
                    sum += matrix[i + x][ii + y];
                }
            
        }
    }
    return sum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    let result = hourglassSum(arr);

    ws.write(result + "\n");

    ws.end();
}

```
