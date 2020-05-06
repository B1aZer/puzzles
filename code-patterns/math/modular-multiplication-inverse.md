What is modular multiplicative inverse? If you have two numbers A and M, you
are required to find B such it that satisfies the following equation:

(AB)%m = 1

Here B is the modular multiplicative inverse of A under modulo M.

Formally, if you have two integers A and M, B is said to be modular
multiplicative inverse of A under modulo M if it satisfies the following
equation:

AB &#2261; 1 (mod M), where B is in the range [1,M-1]

An inverse exists only when A and M are coprime i.e. GCD(A,M) = 1.

For example, if A=5 and M=12, then (A*5)%M = (5*5)%12 = 1. Here, 5 is the modular multiplicative
inverse of 5 under modulo 12.  Though (5*17)%12 = 1, but since 17 > 12, it isn't considered.

Naive approach. O(M).

```js
function modInverse(/*int*/ A,/*int*/ M)
{
    A=A%M;
    for(let B=1;B<M;B++) {
        if(((A*B)%M)==1)) {
            return B;
        }
    }
}
```

Approach 2. O(log(max(A,M)))

```js
let d,x,y;
function modInverse(/*int*/ A, /*int*/ M)
{
    extendedEuclid(A,M);
    return (x%M+M)%M;    //x may be negative
}
```

Approach 3 (M is prime) uses Fermat's Little Theorem. O(log M)

```js
function modInverse(/*int*/ A,/*int*/ M)
{
    return modularExponentiation(A,M-2,M);
}
```

When is modular inverse used?

Modular inverse is used to solve (A/B)%M as follows: (A/B)%M = (A*B^-1)%M.
After you find the inverse, you can solve this equation easily.
