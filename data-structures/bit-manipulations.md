!(x & (x - 1)) is a power of 2 if 0
x = x&(x-1); counts number of 1 (will have all the bits equal to the x except for the rightmost 1 in x)
2i as 1 << i
x ^ ( x & (x-1)) : Returns the rightmost 1 in binary representation of x.
x & (-x) : Returns the rightmost 1 in binary representation of x
x | (1 << n) : Returns the number x with the nth bit set.

```js
(4).toString(2)
parseInt('100', 2)
```
