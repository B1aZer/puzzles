```
x ^ 0 = x
x ^ 1 = ~x
x ^ x = 0

x & 0 = 0
x & 1 = x
x & x = x

x | 0 = x
x | 1 = 1
x | x = x
```

Get Bit

```js
function setBit(num, i) {
  return num | (1 << i);
}
```

Clear Bit

```js
function clearBit(num, i) {
  let mask = ~(1 << i);
  return num & mask;
}
```

Clear Bits from most signficant to i (inclusive)

```js
function clearBit(num, i) {
  let mask = (1 << i) - 1;
  return num & mask;
}
```

Clear Bits from 0 to i (inclusive)

```js
function clearBit(num, i) {
  let mask = (-1 << (i + 1));
  return num & mask;
}
```

Update Bit

```js
function updateBit(num, i, val) {
  let mask = ~(1 << i);
  return (num & mask) | (val << i);
}
```

