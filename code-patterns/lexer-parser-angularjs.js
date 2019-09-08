var Lexer = function(options) {
  this.options = options;
};

Lexer.prototype = {
  constructor: Lexer,

  lex: function(text) {
    this.text = text;
    this.index = 0;
    this.tokens = [];

    while (this.index < this.text.length) {
      var ch = this.text.charAt(this.index);
      if (ch === '"' || ch === "'") {
        this.readString(ch);
      } else if (this.isNumber(ch) || ch === '.' && this.isNumber(this.peek())) {
        this.readNumber();
      } else if (this.isIdent(ch)) {
        this.readIdent();
      } else if (this.is(ch, '(){}[].,;:?')) {
        this.tokens.push({index: this.index, text: ch});
        this.index++;
      } else if (this.isWhitespace(ch)) {
        this.index++;
      } else {
        var ch2 = ch + this.peek();
        var ch3 = ch2 + this.peek(2);
        var op1 = OPERATORS[ch];
        var op2 = OPERATORS[ch2];
        var op3 = OPERATORS[ch3];
        if (op1 || op2 || op3) {
          var token = op3 ? ch3 : (op2 ? ch2 : ch);
          this.tokens.push({index: this.index, text: token, operator: true});
          this.index += token.length;
        } else {
          this.throwError('Unexpected next character ', this.index, this.index + 1);
        }
      }
    }
    return this.tokens;
  },

  is: function(ch, chars) {
    return chars.indexOf(ch) !== -1;
  },

  peek: function(i) {
    var num = i || 1;
    return (this.index + num < this.text.length) ? this.text.charAt(this.index + num) : false;
  },

  isNumber: function(ch) {
    return ('0' <= ch && ch <= '9') && typeof ch === "string";
  },

  isWhitespace: function(ch) {
    // IE treats non-breaking space as \u00A0
    return (ch === ' ' || ch === '\r' || ch === '\t' ||
            ch === '\n' || ch === '\v' || ch === '\u00A0');
  },

  isIdent: function(ch) {
    return ('a' <= ch && ch <= 'z' ||
            'A' <= ch && ch <= 'Z' ||
            '_' === ch || ch === '$');
  },

  isExpOperator: function(ch) {
    return (ch === '-' || ch === '+' || this.isNumber(ch));
  },

  throwError: function(error, start, end) {
    end = end || this.index;
    var colStr = (isDefined(start)
            ? 's ' + start +  '-' + this.index + ' [' + this.text.substring(start, end) + ']'
            : ' ' + end);
    throw $parseMinErr('lexerr', 'Lexer Error: {0} at column{1} in expression [{2}].',
        error, colStr, this.text);
  },

  readNumber: function() {
    var number = '';
    var start = this.index;
    while (this.index < this.text.length) {
      var ch = lowercase(this.text.charAt(this.index));
      if (ch == '.' || this.isNumber(ch)) {
        number += ch;
      } else {
        var peekCh = this.peek();
        if (ch == 'e' && this.isExpOperator(peekCh)) {
          number += ch;
        } else if (this.isExpOperator(ch) &&
            peekCh && this.isNumber(peekCh) &&
            number.charAt(number.length - 1) == 'e') {
          number += ch;
        } else if (this.isExpOperator(ch) &&
            (!peekCh || !this.isNumber(peekCh)) &&
            number.charAt(number.length - 1) == 'e') {
          this.throwError('Invalid exponent');
        } else {
          break;
        }
      }
      this.index++;
    }
    this.tokens.push({
      index: start,
      text: number,
      constant: true,
      value: Number(number)
    });
  },

  readIdent: function() {
    var start = this.index;
    while (this.index < this.text.length) {
      var ch = this.text.charAt(this.index);
      if (!(this.isIdent(ch) || this.isNumber(ch))) {
        break;
      }
      this.index++;
    }
    this.tokens.push({
      index: start,
      text: this.text.slice(start, this.index),
      identifier: true
    });
  },

  readString: function(quote) {
    var start = this.index;
    this.index++;
    var string = '';
    var rawString = quote;
    var escape = false;
    while (this.index < this.text.length) {
      var ch = this.text.charAt(this.index);
      rawString += ch;
      if (escape) {
        if (ch === 'u') {
          var hex = this.text.substring(this.index + 1, this.index + 5);
          if (!hex.match(/[\da-f]{4}/i))
            this.throwError('Invalid unicode escape [\\u' + hex + ']');
          this.index += 4;
          string += String.fromCharCode(parseInt(hex, 16));
        } else {
          var rep = ESCAPE[ch];
          string = string + (rep || ch);
        }
        escape = false;
      } else if (ch === '\\') {
        escape = true;
      } else if (ch === quote) {
        this.index++;
        this.tokens.push({
          index: start,
          text: rawString,
          constant: true,
          value: string
        });
        return;
      } else {
        string += ch;
      }
      this.index++;
    }
    this.throwError('Unterminated quote', start);
  }
};

Parser.prototype = {
  constructor: Parser,

  parse: function(text) {
    this.text = text;
    this.tokens = this.lexer.lex(text);

    var value = this.statements();

    if (this.tokens.length !== 0) {
      this.throwError('is an unexpected token', this.tokens[0]);
    }

    value.literal = !!value.literal;
    value.constant = !!value.constant;

    return value;
  },

  primary: function() {
    var primary;
    if (this.expect('(')) {
      primary = this.filterChain();
      this.consume(')');
    } else if (this.expect('[')) {
      primary = this.arrayDeclaration();
    } else if (this.expect('{')) {
      primary = this.object();
    } else if (this.peek().identifier && this.peek().text in CONSTANTS) {
      primary = CONSTANTS[this.consume().text];
    } else if (this.peek().identifier) {
      primary = this.identifier();
    } else if (this.peek().constant) {
      primary = this.constant();
    } else {
      this.throwError('not a primary expression', this.peek());
    }

    var next, context;
    while ((next = this.expect('(', '[', '.'))) {
      if (next.text === '(') {
        primary = this.functionCall(primary, context);
        context = null;
      } else if (next.text === '[') {
        context = primary;
        primary = this.objectIndex(primary);
      } else if (next.text === '.') {
        context = primary;
        primary = this.fieldAccess(primary);
      } else {
        this.throwError('IMPOSSIBLE');
      }
    }
    return primary;
  },

  throwError: function(msg, token) {
    throw $parseMinErr('syntax',
        'Syntax Error: Token \'{0}\' {1} at column {2} of the expression [{3}] starting at [{4}].',
          token.text, msg, (token.index + 1), this.text, this.text.substring(token.index));
  },

  peekToken: function() {
    if (this.tokens.length === 0)
      throw $parseMinErr('ueoe', 'Unexpected end of expression: {0}', this.text);
    return this.tokens[0];
  },

  peek: function(e1, e2, e3, e4) {
    return this.peekAhead(0, e1, e2, e3, e4);
  },
  peekAhead: function(i, e1, e2, e3, e4) {
    if (this.tokens.length > i) {
      var token = this.tokens[i];
      var t = token.text;
      if (t === e1 || t === e2 || t === e3 || t === e4 ||
          (!e1 && !e2 && !e3 && !e4)) {
        return token;
      }
    }
    return false;
  },

  expect: function(e1, e2, e3, e4) {
    var token = this.peek(e1, e2, e3, e4);
    if (token) {
      this.tokens.shift();
      return token;
    }
    return false;
  },

  consume: function(e1) {
    if (this.tokens.length === 0) {
      throw $parseMinErr('ueoe', 'Unexpected end of expression: {0}', this.text);
    }

    var token = this.expect(e1);
    if (!token) {
      this.throwError('is unexpected, expecting [' + e1 + ']', this.peek());
    }
    return token;
  },

  unaryFn: function(op, right) {
    var fn = OPERATORS[op];
    return extend(function $parseUnaryFn(self, locals) {
      return fn(self, locals, right);
    }, {
      constant:right.constant,
      inputs: [right]
    });
  },

  binaryFn: function(left, op, right, isBranching) {
    var fn = OPERATORS[op];
    return extend(function $parseBinaryFn(self, locals) {
      return fn(self, locals, left, right);
    }, {
      constant: left.constant && right.constant,
      inputs: !isBranching && [left, right]
    });
  },

  identifier: function() {
    var id = this.consume().text;

    //Continue reading each `.identifier` unless it is a method invocation
    while (this.peek('.') && this.peekAhead(1).identifier && !this.peekAhead(2, '(')) {
      id += this.consume().text + this.consume().text;
    }

    return getterFn(id, this.options, this.text);
  },

  constant: function() {
    var value = this.consume().value;

    return extend(function $parseConstant() {
      return value;
    }, {
      constant: true,
      literal: true
    });
  },

  statements: function() {
    var statements = [];
    while (true) {
      if (this.tokens.length > 0 && !this.peek('}', ')', ';', ']'))
        statements.push(this.filterChain());
      if (!this.expect(';')) {
        // optimize for the common case where there is only one statement.
        // TODO(size): maybe we should not support multiple statements?
        return (statements.length === 1)
            ? statements[0]
            : function $parseStatements(self, locals) {
                var value;
                for (var i = 0, ii = statements.length; i < ii; i++) {
                  value = statements[i](self, locals);
                }
                return value;
              };
      }
    }
  },

  filterChain: function() {
    var left = this.expression();
    var token;
    while ((token = this.expect('|'))) {
      left = this.filter(left);
    }
    return left;
  },

  filter: function(inputFn) {
    var fn = this.$filter(this.consume().text);
    var argsFn;
    var args;

    if (this.peek(':')) {
      argsFn = [];
      args = []; // we can safely reuse the array
      while (this.expect(':')) {
        argsFn.push(this.expression());
      }
    }

    var inputs = [inputFn].concat(argsFn || []);

    return extend(function $parseFilter(self, locals) {
      //window.performance.mark('$parseFilter start');
      var input = inputFn(self, locals);
      if (args) {
        args[0] = input;

        var i = argsFn.length;
        while (i--) {
          args[i + 1] = argsFn[i](self, locals);
        }

        var res = fn.apply(undefined, args);
        //window.performance.mark('$parseFilter end');
        //window.performance.measure('$parseFilter' + fn.toString(), '$parseFilter start', '$parseFilter end');
        return res;
      }

      return fn(input);
    }, {
      constant: !fn.$stateful && inputs.every(isConstant),
      inputs: !fn.$stateful && inputs
    });
  },

  expression: function() {
    return this.assignment();
  },

  assignment: function() {
    var left = this.ternary();
    var right;
    var token;
    if ((token = this.expect('='))) {
      if (!left.assign) {
        this.throwError('implies assignment but [' +
            this.text.substring(0, token.index) + '] can not be assigned to', token);
      }
      right = this.ternary();
      return extend(function $parseAssignment(scope, locals) {
        return left.assign(scope, right(scope, locals), locals);
      }, {
        inputs: [left, right]
      });
    }
    return left;
  },

  ternary: function() {
    var left = this.logicalOR();
    var middle;
    var token;
    if ((token = this.expect('?'))) {
      middle = this.assignment();
      if (this.consume(':')) {
        var right = this.assignment();

        return extend(function $parseTernary(self, locals) {
          return left(self, locals) ? middle(self, locals) : right(self, locals);
        }, {
          constant: left.constant && middle.constant && right.constant
        });
      }
    }

    return left;
  },

  logicalOR: function() {
    var left = this.logicalAND();
    var token;
    while ((token = this.expect('||'))) {
      left = this.binaryFn(left, token.text, this.logicalAND(), true);
    }
    return left;
  },

  logicalAND: function() {
    var left = this.equality();
    var token;
    while ((token = this.expect('&&'))) {
      left = this.binaryFn(left, token.text, this.equality(), true);
    }
    return left;
  },

  equality: function() {
    var left = this.relational();
    var token;
    while ((token = this.expect('==','!=','===','!=='))) {
      left = this.binaryFn(left, token.text, this.relational());
    }
    return left;
  },

  relational: function() {
    var left = this.additive();
    var token;
    while ((token = this.expect('<', '>', '<=', '>='))) {
      left = this.binaryFn(left, token.text, this.additive());
    }
    return left;
  },

  additive: function() {
    var left = this.multiplicative();
    var token;
    while ((token = this.expect('+','-'))) {
      left = this.binaryFn(left, token.text, this.multiplicative());
    }
    return left;
  },

  multiplicative: function() {
    var left = this.unary();
    var token;
    while ((token = this.expect('*','/','%'))) {
      left = this.binaryFn(left, token.text, this.unary());
    }
    return left;
  },

  unary: function() {
    var token;
    if (this.expect('+')) {
      return this.primary();
    } else if ((token = this.expect('-'))) {
      return this.binaryFn(Parser.ZERO, token.text, this.unary());
    } else if ((token = this.expect('!'))) {
      return this.unaryFn(token.text, this.unary());
    } else {
      return this.primary();
    }
  },

  fieldAccess: function(object) {
    var getter = this.identifier();

    return extend(function $parseFieldAccess(scope, locals, self) {
      var o = self || object(scope, locals);
      return (o == null) ? undefined : getter(o);
    }, {
      assign: function(scope, value, locals) {
        var o = object(scope, locals);
        if (!o) object.assign(scope, o = {}, locals);
        return getter.assign(o, value);
      }
    });
  },

  objectIndex: function(obj) {
    var expression = this.text;

    var indexFn = this.expression();
    this.consume(']');

    return extend(function $parseObjectIndex(self, locals) {
      var o = obj(self, locals),
          i = getStringValue(indexFn(self, locals), expression),
          v;

      //window.$$stats['$parseObjectIndex'] = window.$$stats['$parseObjectIndex'] || {};
      //window.$$stats['$parseObjectIndex'][expression] = (window.$$stats['$parseObjectIndex'][expression] ? window.$$stats['$parseObjectIndex'][expression] : 0) + 1;
      ensureSafeMemberName(i, expression);
      if (!o) return undefined;
      v = ensureSafeObject(o[i], expression);
      return v;
    }, {
      assign: function(self, value, locals) {
        var key = ensureSafeMemberName(getStringValue(indexFn(self, locals), expression), expression);
        // prevent overwriting of Function.constructor which would break ensureSafeObject check
        var o = ensureSafeObject(obj(self, locals), expression);
        if (!o) obj.assign(self, o = {}, locals);
        return o[key] = value;
      }
    });
  },

  functionCall: function(fnGetter, contextGetter) {
    var argsFn = [];
    if (this.peekToken().text !== ')') {
      do {
        argsFn.push(this.expression());
      } while (this.expect(','));
    }
    this.consume(')');

    var expressionText = this.text;
    // we can safely reuse the array across invocations
    var args = argsFn.length ? [] : null;

    return function $parseFunctionCall(scope, locals) {
      var context = contextGetter ? contextGetter(scope, locals) : isDefined(contextGetter) ? undefined : scope;
      var fn = fnGetter(scope, locals, context) || noop;

      if (args) {
        var i = argsFn.length;
        while (i--) {
          args[i] = ensureSafeObject(argsFn[i](scope, locals), expressionText);
        }
      }

      ensureSafeObject(context, expressionText);
      ensureSafeFunction(fn, expressionText);

      // IE doesn't have apply for some native functions
      var v = fn.apply
            ? fn.apply(context, args)
            : fn(args[0], args[1], args[2], args[3], args[4]);

      if (args) {
        // Free-up the memory (arguments of the last function call).
        args.length = 0;
      }

      return ensureSafeObject(v, expressionText);
      };
  },

  // This is used with json array declaration
  arrayDeclaration: function() {
    var elementFns = [];
    if (this.peekToken().text !== ']') {
      do {
        if (this.peek(']')) {
          // Support trailing commas per ES5.1.
          break;
        }
        elementFns.push(this.expression());
      } while (this.expect(','));
    }
    this.consume(']');

    return extend(function $parseArrayLiteral(self, locals) {
      var array = [];
      for (var i = 0, ii = elementFns.length; i < ii; i++) {
        array.push(elementFns[i](self, locals));
      }
      return array;
    }, {
      literal: true,
      constant: elementFns.every(isConstant),
      inputs: elementFns
    });
  },

  object: function() {
    var keys = [], valueFns = [];
    if (this.peekToken().text !== '}') {
      do {
        if (this.peek('}')) {
          // Support trailing commas per ES5.1.
          break;
        }
        var token = this.consume();
        if (token.constant) {
          keys.push(token.value);
        } else if (token.identifier) {
          keys.push(token.text);
        } else {
          this.throwError("invalid key", token);
        }
        this.consume(':');
        valueFns.push(this.expression());
      } while (this.expect(','));
    }
    this.consume('}');

    return extend(function $parseObjectLiteral(self, locals) {
      var object = {};
      for (var i = 0, ii = valueFns.length; i < ii; i++) {
        object[keys[i]] = valueFns[i](self, locals);
      }
      return object;
    }, {
      literal: true,
      constant: valueFns.every(isConstant),
      inputs: valueFns
    });
  }
};
