While I was testing the Angular sanitizer I thought about overwriting native
  JavaScript functions using Angular expressions. The trouble is Angular
expressions do not support function statements or function expressions so you
would be unable to overwrite the function with any value. Pondering this for a
  while I thought about String.fromCharCode. Because the function is called
    from the String constructor and not via a string literal, the "this" value
will be the String constructor. Maybe I could backdoor the fromCharCode
function!  How can you backdoor the fromCharCode function without being able to
create a function? Easy: re-use an existing function! The problem is how to
control the value every time fromCharCode is called. If we use the Array join
  function we can make the String constructor a fake array. All we need is a
length property and a property of 0 for the first index of our fake array,
  fortunately it already has a length property because its argument length is
1. We just need to give it a 0 property. Here's how to do it:

```js
'a'.constructor.fromCharCode=[].join;
'a'.constructor[0]='\u003ciframe onload=alert(/Backdoored/)\u003e';
```
