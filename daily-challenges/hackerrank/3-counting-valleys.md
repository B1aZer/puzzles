Gary is an avid hiker. He tracks his hikes meticulously, paying close attention
to small details like topography. During his last hike he took exactly  steps.
For every step he took, he noted if it was an uphill, , or a downhill,  step.
Gary's hikes start and end at sea level and each step up or down represents a
unit change in altitude. We define the following terms:

A mountain is a sequence of consecutive steps above sea level, starting with a
step up from sea level and ending with a step down to sea level.  A valley is a
sequence of consecutive steps below sea level, starting with a step down from
sea level and ending with a step up to sea level.  Given Gary's sequence of up
and down steps during his last hike, find and print the number of valleys he
walked through.

For example, if Gary's path is , he first enters a valley  units deep. Then he
climbs out an up onto a mountain  units high. Finally, he returns to sea level
and ends his hike.

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

// Complete the countingValleys function below.
function countingValleys(n, s) {
    let meadows = 0;
    let meadowStart = false;
    s.split('').reduce((acc, i) => {       
        if (acc === 0 && parse(i) === -1) {
            meadowStart = true;
        }
        if (meadowStart && acc === -1 && parse(i) === 1) {
            meadowStart = false;
            meadows += 1;
        }
        acc += parse(i);
        return acc; 
    }, 0);
    return meadows;

}

function parse(i) {
    return i === 'U' ? 1 : -1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    let result = countingValleys(n, s);

    ws.write(result + "\n");

    ws.end();
}
```
