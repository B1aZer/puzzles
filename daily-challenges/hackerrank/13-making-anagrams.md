Alice is taking a cryptography class and finding anagrams to be very
useful. We consider two strings to be anagrams of each other if the
first string's letters can be rearranged to form the second string.
In other words, both strings must contain the same exact letters in
the same exact frequency For example, bacdc and dcbac are anagrams,
but bacdc and dcbad are not.

Alice decides on an encryption scheme involving two large strings
where encryption is dependent on the minimum number of character
deletions required to make the two strings anagrams. Can you help
her find this number?

Given two strings,  and , that may or may not be of the same length,
determine the minimum number of character deletions required to make
and  anagrams. Any characters can be deleted from either of the
strings.

For example, if  and , we can delete  from string  and  from string
so that both remaining strings are  and  which are anagrams.

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

// Complete the makeAnagram function below.
function makeAnagram(a, b) {
    const count = new Array(26).fill(0);
    let difF = x => x.charCodeAt(0) - 'a'.charCodeAt(0);

    for (let i = 0; i < a.length; i++) {
        let difA = difF(a[i]);
        count[difA]++;
    }
    
    for (let i = 0; i < b.length; i++) {
        let difB = difF(b[i]);
        count[difB]--;
    }

    return count.reduce((acc, v) => {
        acc += Math.abs(v);
        return acc;

    }, 0)
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();

    const b = readLine();

    const res = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}

```
