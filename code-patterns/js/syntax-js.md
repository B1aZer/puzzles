An expression produces a value. Statement controls flow.

The following statements are not terminated by semicolons if they end with a block:

 - Loops: for, while (but not do-while)
 - Branching: if, switch, try
 - Function declarations (but not function expressions)

Automatic Semicolon Insertion will turn

```js
func()
[ 'ul', 'ol' ].forEach(function (t) { handleTag(t) })
```

Into

```js
func()[ 'ul', 'ol' ].forEach(function (t) { handleTag(t) })
```
