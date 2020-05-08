There are multiple parsers that can parse JavaScript code (esprima, acorn).
These parsers will construct an AST from ypur code. AST can next be manipulated
with tools like recast to modify existing code.

```js
const recast = require('recast');
const { Parser } = require("acorn");

const ast = Parser.parse(readFileSync(fileName).toString());

recast.visit(ast, visitFunctionDeclaration(path){
  // the navigation code here...

  // return false to stop at this depth
  return false;
})
```

AST can be tested on https://astexplorer.net/
