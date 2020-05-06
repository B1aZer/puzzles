Emma is playing a new mobile game that starts with consecutively numbered
clouds. Some of the clouds are thunderheads and others are cumulus. She can
jump on any cumulus cloud having a number that is equal to the number of the
current cloud plus  or . She must avoid the thunderheads. Determine the minimum
number of jumps it will take Emma to jump from her starting postion to the last
cloud. It is always possible to win the game.

For each game, Emma will get an array of clouds numbered  if they are safe or
if they must be avoided. For example,  indexed from . The number on each cloud
is its index in the list so she must avoid the clouds at indexes  and . She
could follow the following two paths:  or . The first path takes  jumps while
the second takes .

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

// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c) {
    let jumps = 0;
    let clouds = c;
    function countJumps(i) {
        jumps += 1;
        let nextJump = i+2;
        if (clouds.length - 1 <= nextJump) {
            return;
        } else if (clouds[nextJump] === 1) {
            return countJumps(i+1);
        }
        return countJumps(nextJump);
    }
    countJumps(0);
    return jumps;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c);

    ws.write(result + "\n");

    ws.end();
}
```
