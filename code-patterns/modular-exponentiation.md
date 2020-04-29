Mudlar rules

```
(a+b)%c = (a%c + b%c)%c
(a*b)%c = ((a%c) * (b%c))%c
(a-b)%c = ((a%c) - (b%c) + c)%c
(a/b)%c = ((a%c) * (b^-1%c))%c
```


```typescript
function modularExponentiation(x:number,n:number,M:number) {
    if(n==0)
        return 1;
    else if(n%2 == 0)        //n is even
        return modularExponentiation((x*x)%M,n/2,M);
    else                             //n is odd
        return (x*modularExponentiation((x*x)%M,(n-1)/2,M))%M;

}
```
