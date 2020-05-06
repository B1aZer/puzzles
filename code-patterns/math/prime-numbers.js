Primality test.

Naive approach.

```js
function checkprime(N) {
    let count = 0;
    for(let i = 1; i <= N; ++i )
        if( N % i == 0 )
            count++;
    if(count == 2)
        return '${N} is prime';
    else
        return '${N} is not prime';
}
```

Optimized approach.

As next divisers after sqrt of N will be divedents of previous dividers.

```js
function checkprime(N) {
    let count = 0;
    for( let i = 1; i * i <=N; ++i ) {
         if ( N % i == 0) {
             if ( i * i == N )
                     count++;
             else       // i < sqrt(N) and (N / i) > sqrt(N)
                     count += 2;
          }
    }
    if(count == 2)
        return '${N} is prime';
    else
        return '${N} is not prime';
}
```

Modification of Sieve of Eratosthenes for fast factorization

```js
function factorize(n) {
    let res = new Vector();
    for (let i = 2; i * i <= n; ++i) {
        while (n % i == 0) {
            res.push_back(i);
            n /= i;
        }
    }
    if (n != 1) {
        res.push_back(n);
    }
    return res;
}
```

This can be further optimized by storing prime number of the least value, which
divides the current N in an array.
