You have to be careful when using global objects like Object, String, RegExp,..
These constructor functions that can be modified. As well as any methods on these
constructors can be modified.

```js

'a'.constructor.fromCharCode=[].join;
//'a'.constructor is String constructor

'a'.constructor[0]='\u003ciframe onload=alert(/Backdoored/)\u003e';

String.fromCharCode('a');
// will execute join function with a arg on String constructor
// (which is modified above)

```
