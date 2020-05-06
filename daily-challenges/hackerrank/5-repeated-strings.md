Lilah has a string, , of lowercase English letters that she repeated infinitely
many times.

Given an integer, , find and print the number of letter a's in the first
letters of Lilah's infinite string.

For example, if the string  and , the substring we consider is , the first
characters of her infinite string. There are  occurrences of a in the
substring.

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

// Complete the repeatedString function below.
function repeatedString(s, n) {
    let aCount = s.split('').filter((l) => l === 'a').length;
    let count = aCount * Math.floor(n / s.length);
    let wLeft = n - Math.floor(n / s.length) * s.length;
    let aLeft = s.substring(0, wLeft).split('').filter((l) => l === 'a').length;
    let allCount = count + aLeft;
    return allCount;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const n = parseInt(readLine(), 10);

    let result = repeatedString(s, n);

    ws.write(result + "\n");

    ws.end();
}
```
