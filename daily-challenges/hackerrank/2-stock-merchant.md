John works at a clothing store. He has a large pile of socks that he must pair
by color for sale. Given an array of integers representing the color of each
sock, determine how many pairs of socks with matching colors there are. n = 7

For example, there are  socks with colors ar=[1,2,1,2,1,3,2]. There is one pair
of color  1 and one of color 2. There are three odd socks left, one of each color.
The number of pairs is 2.


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

// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
   let hash = {};
   return ar.reduce((acc, x) => {
       hash[x] = hash[x] ? hash[x] + 1 : 1; 
       return acc + (hash[x] % 2 === 0 ? 1 : 0); 
   }, 0); 

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = sockMerchant(n, ar);

    ws.write(result + "\n");

    ws.end();
}

```
