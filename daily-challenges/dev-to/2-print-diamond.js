The shape that the print method will return should resemble a diamond. A number
provided as input will represent the number of asterisks printed on the middle
line. The line above and below will be centered and will have two less
asterisks than the middle line. This reduction will continue for each line
  until a line with a single asterisk is printed at the top and bottom of the
figure

### Solution

```js
function printDiamond(n, rev = false,  i = 0, str='') {
// n is a middle of diamond
// handle edge cases
	if (i === n) {
  	return str;
  }
  for (let k=0; k< (rev ? 10 - i: n - i); k++) {
  	str += '_';
  }
  for (let k=0; k<(i*2) - 1; k++) {
  	str += '*';
  }
  str += '<br/>';
  let next = rev ? i - 1 : i + 1;
	return printDiamond(n, rev, next, str);
}

document.body.innerHTML = printDiamond(10) + printDiamond(0, true, 10);
```
