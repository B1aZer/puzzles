You can simulate named parameters if you destructure with an object pattern in the parameter list:

```js
function selectEntries({ start=0, end=-1, step=1 } = {}) { // (A)
    // The object pattern is an abbreviation of:
    // { start: start=0, end: end=-1, step: step=1 }

    // Use the variables `start`, `end` and `step` here
    ···
}

selectEntries({ start: 10, end: 30, step: 2 });
selectEntries({ step: 3 });
selectEntries({});
selectEntries();
```

In function and constructor calls, the spread operator turns iterable values into arguments:

```js
> Math.max(-1, 5, 11, 3)
11
> Math.max(...[-1, 5, 11, 3])
11
> Math.max(-1, ...[-5, 11], 3)
11
```

In Array literals, the spread operator turns iterable values into Array elements:

```js
> [1, ...[2,3], 4]
[1, 2, 3, 4]
```

Default values exist in their own scope, which is between the “outer” scope surrounding the function and the “inner” scope of the function body. Therefore, you can’t access “inner” variables from the default values:

```js
const x = 'outer';
function foo(a = x) {
    const x = 'inner';
    console.log(a); // outer
}
```

Simulating name optional parameters

```js
function selectEntries({ start=0, end=-1, step=1 } = {}) {
    ···
}
```

map over Map

```js
const map0 = new Map([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
]);

const map1 = new Map( // step 3
    [...map0] // step 1
    .map(([k, v]) => [k*2, '_'+v]) // step 2
);
// Resulting Map: {2 -> '_a', 4 -> '_b', 6 -> '_c'}
```

Required parameter

In ECMAScript 6, you can (ab)use default parameter values to achieve more concise code (credit: idea by Allen Wirfs-Brock):

```js
/**
 * Called if a parameter is missing and
 * the default value is evaluated.
 */
function mandatory() {
    throw new Error('Missing parameter');
}
function foo(mustBeProvided = mandatory()) {
    return mustBeProvided;
}
Interaction:

> foo()
Error: Missing parameter
> foo(123)
123
```

The spread operator (...) looks exactly like the rest operator, but is its opposite:

Rest operator: collects the remaining items of an iterable into an Array and is used for rest parameters and destructuring.
Spread operator: turns the items of an iterable into arguments of a function call or into elements of an Array.

```js
const arr1 = ['a', 'b'];
const arr2 = ['c', 'd'];

arr1.push(...arr2);
// arr1 is now ['a', 'b', 'c', 'd']
```

The spread operator lets you convert any iterable value to an Array.
