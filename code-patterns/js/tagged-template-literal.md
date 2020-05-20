The following is a tagged template literal (short: tagged template):

```js
tagFunction`Hello ${firstName} ${lastName}!`
```

Putting a template literal after an expression triggers a function call, similar to how a parameter list (comma-separated values in parentheses) triggers a function call. The previous code is equivalent to the following function call (in reality, first parameter is more than just an Array, but that is explained later).

```js
tagFunction(['Hello ', ' ', '!'], firstName, lastName)
```

```js
String.raw`\n` === '\\n'
// true
```

```js
POST`http://foo.org/bar?a=${a}&b=${b}
     Content-Type: application/json
     X-Credentials: ${credentials}

     { "foo": ${foo},
       "bar": ${bar}}
     `
     (myOnReadyStateChangeHandler);
```

Tagged templates used in React and GraphQL

Template 

```js
const tmpl = addrs => `
    <table>
    ${addrs.map(addr => `
        <tr><td>${addr.first}</td></tr>
        <tr><td>${addr.last}</td></tr>
    `).join('')}
    </table>
`;
```
