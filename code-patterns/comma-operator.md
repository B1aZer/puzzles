I was surprised to see the result of this line of code:

```js
const what = (1,2,3,4);
console.log(what); //=> 4
```

I asked around on twitter and learned that the syntax construct at play here is the comma operator.

The comma operator evaluates each of its operands (from left to right) and returns the value of the last operand.

And that is why what gets bound to 4.
