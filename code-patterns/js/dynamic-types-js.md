JavaScript has six types:

 - Undefined, Null
 - Boolean, String, Number
 - Object

First 5 are primitive meaning they are:

 - compared by value
 - immutable
 - we cant define our own primitive

Objects are:

 - compared by reference
 - mutable
 - extendable

Primitives has wrappers Boolean, String, Number. They can be used as
wrapper (with new) or for type conversion (without new). Later is preferable.

Falsy values:

 - undefined, null, false, 0, NaN, ''

They are equal to each other, except:

```js
NaN === NaN
// false
```
typeof works only on Primitives and can be used on undeclared variables

```js
typeof undeclaredVariable === 'undefined'
```
Historical exception:

```js
typeof null === 'object'
```
instanceof used on Objects
