Starting with a 1-indexed array of zeros and a list of operations, for each operation add a value to each of the array element between two given indices, inclusive. Once all operations have been performed, return the maximum value in your array.

For example, the length of your array of zeros . Your list of queries is as follows:

```
    a b k
    1 5 3
    4 8 7
    6 9 1
```

Add the values of  between the indices  and  inclusive:

```
index->	 1 2 3  4  5 6 7 8 9 10
	[0,0,0, 0, 0,0,0,0,0, 0]
	[3,3,3, 3, 3,0,0,0,0, 0]
	[3,3,3,10,10,7,7,7,0, 0]
	[3,3,3,10,10,8,8,8,1, 0]
```

The largest value is  after all operations are performed.

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

// Complete the arrayManipulation function below.
function arrayManipulation(n, q, ws) {
    let vector = new Array(n).fill(0);
    let max = -Infinity;
    let hash = {};
    for (let i = 0; i < q.length; i++) {
        //max = addFromToIncWithVal(vector, q[i][0], q[i][1], q[i][2], max);
        hash[q[i][0]] = hash[q[i][0]] ? (hash[q[i][0]] + q[i][2]) : q[i][2];
        //edge case + 1
        hash[q[i][1] + 1] = hash[q[i][1] + 1] ? (hash[q[i][1] + 1] - q[i][2]) : -q[i][2];
    }
    vector.reduce((acc, v, i) => {
        acc = acc + (hash[i + 1] ? hash[i + 1] : 0);
        max = max > acc ? max : acc;
        return acc;
    }, 0);
    return max;
}

function addFromToIncWithVal(vector, i, ii, val, max) {
    for (let j = i - 1; j <= ii - 1; j++) {
        let newVal = vector[j] + val;
        vector[j] = newVal;
        if (newVal > max) {
            max = newVal;
        }
    }
    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let queries = Array(m);

    for (let i = 0; i < m; i++) {
        queries[i] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    let result = arrayManipulation(n, queries, ws);

    ws.write(result + "\n");

    ws.end();
}

```
