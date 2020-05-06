Arrays in js can have holes and properties.

```js
new Array(100).fill(0)
```

Indices are numbers i in the range 0 ≤ i < 2^32−1. This varies depending on environment.

Setting array length to 0 will delete all element, this is slower than
assigning [], and mutates the original array.

The maximum array length is 2^32−1.

```js
['a',, 'b'].forEach(function (x,i) { console.log(i+'.'+x) })
```

forEach skips holes but not undefined. map skipes but preserves.

join() converts holes, undefineds, and nulls to empty strings.

```js
['a',, 'b'].filter(function (x) { return true })
//['a','b']
```

```js
Array.apply(null, Array(3))
//[ undefined, undefined, undefined ]
```

For string we can use localeCompare to compare
```
String.prototype.localeCompare
```

In JavaScript, you cannot pass parameters by reference; that is, if you pass a
variable to a function, its value is copied and handed to the function (pass by
value). Therefore, the function can’t change the variable. If you need to do
so, you must wrap the value of the variable (e.g., in an array).

```js
function incRef(numberRef) {
    numberRef[0]++;
}
var n = [7];
incRef(n);
console.log(n[0]);  // 8
```
