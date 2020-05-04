Mudlar rules

```
(a+b)%c = (a%c + b%c)%c
(a*b)%c = ((a%c) * (b%c))%c
(a-b)%c = ((a%c) - (b%c) + c)%c
(a/b)%c = ((a%c) * (b^-1%c))%c
```

```
A^B % c = ((A % c) ^ B) %c
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

A^B can easily overflow computer buffer on large B. We can use divide and conquer strategy:

2^90 mod 13
2^90 mod 13 = (2^50 * 2^40) mod 13
2^90 mod 13 = (2^50 mod 13 * 2^40 mod 13) mod 13
2^90 mod 13 = ( 4 * 3 ) mod 13
2^90 mod 13 = 12 mod 13
2^90 mod 13 = 12

We can quickly calculate A^B mod C if B is a power of 2.

A^2 mod C = (A * A) mod C = ((A mod C) * (A mod C)) mod C

7^256 mod 13
7^1 mod 13 = 7
7^2 mod 13 = (7^1 *7^1) mod 13 = (7^1 mod 13 * 7^1 mod 13) mod 13
7^2 mod 13 = (7 *7) mod 13 = 49 mod 13 = 10
7^2 mod 13 = 10
7^4 mod 13 = (7^2 *7^2) mod 13 = (7^2 mod 13 * 7^2 mod 13) mod 13
7^4 mod 13 = (10 * 10) mod 13 = 100 mod 13 = 9
7^4 mod 13 = 9
7^8 mod 13 = (7^4 * 7^4) mod 13 = (7^4 mod 13 * 7^4 mod 13) mod 13
7^8 mod 13 = (9 * 9) mod 13 = 81 mod 13 = 3
7^8 mod 13 = 3
...
7^256 mod 13 = (7^128 * 7^128) mod 13 = (7^128 mod 13 * 7^128 mod 13) mod 13
7^256 mod 13 = (3 * 3) mod 13 = 9 mod 13 = 9
7^256 mod 13 = 9

We can calculate A^B mod C for any B

Step 1: Divide B into powers of 2 by writing it in binary
Step 2: Calculate mod C of the powers of two ≤ B
Step 3: Use modular multiplication properties to combine the calculated mod C
values

```js
//Fast Modular Exponentiation
//by Cameron

//adjust x,y,z to calculate x^y mod z
var x=98765;
var y=1234;
var z=123557;

//converts a non-negative integer to 
//binary represented by a string of 1s and 0s 
var numtobin=function(num){
    var bintext="";
    var bits=floor(log(num)/log(2))+1;
    var currentnum=num;
    for(var i=0;i<bits;i++){
        bintext= currentnum%2 + bintext;
        currentnum=floor(currentnum/2);
    }
    return bintext;
};

//converts a binary number (represented by a string of 1s
//and 0s) to a non-negative integer 
var bintonum=function(binchars){
    var binnum=0;
    var multiplier=1;
    for(var i=0;i<binchars.length;i++){
        if(binchars[binchars.length-i-1]==="1"){
            binnum += 1*multiplier;    
        }
        multiplier*=2;
    }
    return binnum;
};

//calculates A mod B (using quotient remainder theorem)
var mymod=function(A,B){
    //A=B*Q+R, where  0 <= R < B
    //A mod B = R
    //R= A-B*Q, Q=floor(A/B)
    return A-floor(A/B)*B;
};

//calculates A^B mod C using fast modular exponentiation
var fastmodexp=function(A,B,C){
    fill(0, 0, 0);
   
    var linelength=(""+A+"^"+B+" mod "+C+"="+C).length;

    var binB= numtobin(B);
    text(B + "=" + binB + " in binary",20,60);
    
    var Bdigits= binB.length;
    
    var AtoBmodC=[];
    
    var power=1;
    var product=0;
    var thisline="";
    for(var i=0; i<Bdigits; i++){
        if(i===0){
            AtoBmodC[0]= mymod(A,C);
        }
        else{
            AtoBmodC[i]= mymod(AtoBmodC[i-1]*AtoBmodC[i-1],C);
        }
        
        thisline=""+A+"^"+power+" mod "+C + "=" +AtoBmodC[i];
        
       
        if(binB.charAt(Bdigits-1-i)==="1"){
            
            for(var j=thisline.length;j<linelength+10;j++){
                thisline += "  ";
            }
            thisline += AtoBmodC[i];
            
            if(product===0){
                product= AtoBmodC[i];
            }else{
                product *= AtoBmodC[i];
            }
            product=mymod(product,C);
        }
        text(thisline,20,100+20*i);
        
        power *=2;
    }
    line(20,100+20*i,380,100+20*i);
    thisline= ""+A+"^"+B+" mod "+C+" = ";
    thisline += product+" mod "+C;
    text(thisline,20,100+20*i+20);
    
    var result=mymod(product,C);
    fill(255, 0, 0);
    text(A+"^"+B+" mod "+C+" = "+result,20,100+20*i+40);
    text(A+"^"+B+" mod "+C+" = "+result,20,20);
    return result;
};

fastmodexp(x,y,z);



fill(255, 0, 0);
```
