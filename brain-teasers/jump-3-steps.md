A child is running up a staircase with n steps and can hop either 1 step, 2
steps, or 3 steps at a time. Implement a method to count how many possible ways
the child can run up the stair

### Solution

```js
function jumpStep(n) {
	if (n === 0) {
  	return 1;
  }
  if (n === 1) {
  	return 1
  }
  if (n === 2) {
  	return 2;
  }
  return jumpStep(n - 1) + jumpStep(n - 2) + jumpStep(n - 3);
}
```
