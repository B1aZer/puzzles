It's New Year's Day and everyone's in line for the Wonderland rollercoaster
ride! There are a number of people queued up, and each person wears a sticker
indicating their initial position in the queue. Initial positions increment by
from  at the front of the line to  at the back.

Any person in the queue can bribe the person directly in front of them to swap
positions. If two people swap positions, they still wear the same sticker
denoting their original places in line. One person can bribe at most two
others. For example, if  and  bribes , the queue will look like this: .

Fascinated by this chaotic queue, you decide you must know the minimum number
of bribes that took place to get the queue into its current state!

```js
'use strict';

const fs = require('fs')

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

// Complete the minimumBribes function below.
function minimumBribes(q, ws) {
    // construct a map of indexes for faster retrieval
    let indexesOf = new Map();
    let ind = 0;
    for (let v of q) {
        indexesOf.set(v, ind);
        //if ((v !== i + 1) && Math.abs(v - (i + 1)) > 2) {
        // return 'Too chaotic';
        //}
        ind++;
    }
    let steps = 0;
    /*
    for (let i=1; i<q.length; i++) {
        if (q[i] < q[i - 1]) {
          let stepsCount = q[i - 1] - q[i];  
          if (stepsCount > 2) {
              return 'Too chaotic';
          }
          steps += stepsCount;
        }
    }
    */
    
    /*
    for (let i=q.length - 1; i>=0; i--) {
        if (q[i] - (i + 1) > 2) {
            return 'Too chaotic';
        }
        for (let j = Math.max(0, q[i] - 2); j < i; j++) {
            if (q[j] > q[i]) {
                steps += 1;
            }
        }
    }
    */

    // for value
    for (let i=q.length; i>=1; i--) {
        // if element has less index than its value
        if (indexesOf.get(i) < i - 1) {
            // proper index - current index
            let stepsCount = (i - 1) - indexesOf.get(i); 
            if (stepsCount > 2) {
                return 'Too chaotic';
            }
            for (let ii = 0; ii < stepsCount; ii++) {
                // shouldn we use q here, because it's stale?
                let decV = indexesOf.get(q[i - 1 - ii]) - 1;
                indexesOf.set(q[i - 1 - ii], decV);
            }
            steps += stepsCount;
        }
        
    }
    
    // for i from 0 to n
    // where i is the initial index
    // swap array until on the right spot
    // while (i is not on the spot) {
        // swap (left, i) or swap (i, right)
        // depending on whether i less than original or more
    //}
    // swaps += 1
     
    

    return steps;
}

function swap(a, oldI, newI) {
    let temp = a[oldI];
    let steps = 0;
    for (let i = 0; i < Math.abs(oldI - newI); i++) {
        a[oldI - i] = a[oldI - i - 1];
        steps += 1;
    }
    a[newI] = temp;
    return steps + 1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const q = readLine().split(' ').map(qTemp => parseInt(qTemp, 10));

        ws.write(minimumBribes(q, ws) + "\n");
    }
    ws.end();
}

```
