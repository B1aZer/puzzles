Check if value is coercible to an object

```js
({} = [true, false]); // OK, Arrays are coercible to objects
({} = 'abc'); // OK, strings are coercible to objects

({} = undefined); // TypeError
({} = null); // TypeError
```

Array patterns work with iterables

```js
const [x,...y] = 'abc'; // x='a'; y=['b', 'c']
```

You can’t access the elements of a Set via indices, but you can do so via an
iterator. Therefore, Array destructuring works for Sets:

```js
const [x,y] = new Set(['a', 'b']); // x='a'; y='b’;
```

Check if iterable

```js
[] = {}; // TypeError, empty objects are not iterable
[] = undefined; // TypeError, not iterable
[] = null; // TypeError, not iterable
```

Destructoring support default values

```js
const [x=1] = [undefined]; // x = 1
```

The default values themselves are only computed when they are needed.

Default values can refer to other variables in the pattern  As opposed to function params.

```js
const [{ prop: x } = { prop: 123 }] = [{}];
```

Will work because, pattern will match recursively.

```js
const FOO = 'foo';
const { [FOO]: f } = { foo: 123 }; // f = 123
```
Computed property keys work for symbols as well.

Elision lets you use the syntax of Array “holes” to skip elements during destructuring:

```
const [,, x, y] = ['a', 'b', 'c', 'd']; // x = 'c'; y = 'd'
```

There are two things to be mindful of when using destructuring:

 - You can’t start a statement with a curly brace.
 - During destructuring, you can either declare variables or assign to them, but not both.

```js
({ a, b } = someObject); // OK
```

With let, var and const, curly braces never cause problems:

```js
const { a, b } = someObject; // OK
```
