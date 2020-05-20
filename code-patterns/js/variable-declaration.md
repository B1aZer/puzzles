```js
let tmp = true;
if (true) { // enter new scope, TDZ starts
    // Uninitialized binding for `tmp` is created
    console.log(tmp); // ReferenceError

    let tmp; // TDZ ends, `tmp` is initialized with `undefined`
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
console.log(tmp); // true
```

```js
if (true) { // enter new scope, TDZ starts
    const func = function () {
        console.log(myVar); // OK!
    };

    // Here we are within the TDZ and
    // accessing `myVar` would cause a `ReferenceError`

    let myVar = 3; // TDZ ends
    func(); // called outside TDZ
}
```

The following loops allow you to declare variables in their heads:

for
for-in
for-of

let declarations create variables separately for each iteration (helpful for
using in callbacks).

```js
function func(arg) {
    let arg; // static error: duplicate declaration of `arg`
}
```

Scope for parameters and body of function differs

```js
const foo = 'outer';
function bar(func = x => foo) {
    const foo = 'inner';
    console.log(func()); // outer
}
bar();
```
