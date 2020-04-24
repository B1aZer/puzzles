While calculating x^n, the basis of Binary Exponentiation relies on whether n is odd or even.

If n is even, then x^n can be broken down to (x^2)^n/2
If n is odd, then x*x^n-1

3^10 = 3^2^5 = 9^5= 9*9^2^2 = 9 * 81^2 = 9 * 81 * 81

The comlexity is reduced from O(n) to O(log n)

```typescript
function binaryExponentiation(x:number,n:number) {
    if(n==0)
        return 1;
    else if(n%2 == 0)        //n is even
        return binaryExponentiation(x*x,n/2);
    else                             //n is odd
        return x*binaryExponentiation(x*x,(n-1)/2);
}
```
