The GCD of two or more numbers is the largest positive number that divides all
the numbers that are considered. For example, the GCD of 6 and 10 is 2 because
it is the largest positive number that can divide both 6 and 10.

Naive approach. O(min(A, B)).

```js
function GCD(/* int */ A, /* int */ B) {
    let m = Math.min(A, B);
    let gcd;
    for(let i = m; i > 0; --i)
        if(A % i === 0 && B % i == 0) {
            gcd = i;
            return gcd;
        }
}
```

Euclid's algorithm. O(log(max(A, B))).

The idea behind this algorithm is GCD(A,B) = GCD(B, A%B). It will recurse until A%B=0.

https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm

```js
function GCD(/* int */ A, /* int */ B) {
    if (B===0)
        return A;
    else
        return GCD(B, A % B);
}

```

Extended Euclidean algorithm.  O(log(max(A, B))).

This algorithm is an extended form of Euclid’s algorithm. GCD(A,B) has a special
property so that it can always be represented in the form of an equation i.e. 
Ax + By = GCD(A,B).

The coefficients (x and y) of this equation will be used to find the modular
multiplicative inverse. The coefficients can be zero, positive or negative in
value.

This algorithm takes two inputs as A and B and returns GCD(A,B) and coefficients of the
above equation as output.

```js
let gcd, x, y;
function extendedEuclid(/* int */  A, /* int */ B) {
    if(B == 0) {
        gcd = A;
        x = 1;
        y = 0;
    }
    else {
        extendedEuclid(B, A%B);
        let temp = x;
        x = y;
        y = temp - (A/B)*y;
    }
}
```
