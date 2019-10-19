Your goal is to create a function that removes the first and last letters of a
string. Strings with two characters or less are considered invalid. You can
choose to have your function return null or simply ignore.

### Solution

```js
Array.prototype._shift = function() {
	this.shift();
  return this;
}
Array.prototype._pop = function() {
	this.pop();
  return this;
}
function frstL(str) {
	if (str.length <= 2) {
  	return null
  }
	return str.split('')._shift()._pop().join('');
}
function frstLes(str) {
	if (str.length <= 2) {
  	return null
  }
  let [first, ...last] = str.split('');
  last.pop();
  let middle = last;
  return middle.join('');
}
console.info(frstL('abcdefg') === 'bcdef');
console.info(frstLes('abcdefg') === 'bcdef');
```
