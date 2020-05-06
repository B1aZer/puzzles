You are given an unordered array consisting of consecutive integers  [1, 2, 3, ..., n] without any duplicates. You are allowed to swap any two elements. You need to find the minimum number of swaps required to sort the array in ascending order.

For example, given the array  we perform the following steps:

```
i   arr                         swap (indices)
0   [7, 1, 3, 2, 4, 5, 6]   swap (0,3)
1   [2, 1, 3, 7, 4, 5, 6]   swap (0,1)
2   [1, 2, 3, 7, 4, 5, 6]   swap (3,4)
3   [1, 2, 3, 4, 7, 5, 6]   swap (4,5)
4   [1, 2, 3, 4, 5, 7, 6]   swap (5,6)
5   [1, 2, 3, 4, 5, 6, 7]
```

It took  swaps to sort the array.

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

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
    let indexesOf = new Map();
    arr.forEach((v,i) => {
        indexesOf.set(v, i);
    })
    let steps = 0;
    for (let i = 0; i < arr.length; i++) {
        // thisEl value > proper value
        if (arr[i] > i + 1) {
            //swap(arr, i, arr.indexOf(i+1), indexesOf);
            let propI = indexesOf.get(i+1)
            let propV = arr[i];
            swap(arr, i, indexesOf.get(i+1), indexesOf);
            indexesOf.set(propV, propI);
            steps++;
        }
    }
    return steps;

}

function swap(arr, i, ii, indexesOf) {
    let temp = arr[ii];
    arr[ii] = arr[i];
    arr[i] = temp;
    //indexesOf.set(arr[i], 0);
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}

```
