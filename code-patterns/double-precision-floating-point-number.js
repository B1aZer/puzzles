Math.pow(2,53) == Math.pow(2,53)+1

/* JS uses double point numbers with 52 bits of mantissa.
 * Numbers larger than 2^52 loses precision. See Machine epsilon.
 *
 * That is the reason any operations (most frequently - multiplication)
 * of large numbers ( e.g. 0xffffffff) will give incorrect result.
 *
 * Math.imul(a,b) multiplies a and b as though they were
 * 32 bit signed integers.
 *
 * (a*b)|0 tries to emulate this operation until 2^53 issue is encountered.
 *
 * | 0 can also be used to floor numbers (until the above issue).
 */

15.2 | 0 === 15

/* Won't work because of operation precedence */

(15.2 | 0) === 15

/* Works because all bitwiser operation convert double precision floating
 * number to 32 bit signed integer.
 */

123..toString()
123 .toString()  // space before the dot
123.0.toString()
(123).toString()

/* We can't directly run Number method because Number is floating number
 * internally.
 */

parseInt('')
+''
Number('')

/* Will give different results because of compliance with old languages.
 *
 * Don't use parseInt to convert number to integer
 */

parseInt(1000000000000000000000.5, 10) === 1
parseInt(0.0000008, 10)

/* Use Math function or bit operations. You can use parseInt for converting
* Strings to integers. But be aware that it stops on first non-num character. */

parseInt('123o1', 10) === 123

/* Some other number specifics
 */

typeof NaN
// number
NaN === NaN
// false
[ NaN ].indexOf(NaN)
// -1
isNaN('xyz')
// true

// Maximum and minimum number
Math.pow(2, 1023)
// 8.98846567431158e+307
Math.pow(2, 1024)
// Infinity
1/0
// Infinity
1/-0
// -Infinity
/* JS have actually two 0 numbers -0 and +0

/* JavaScript’s numbers are usually entered as decimal floating-point numbers,
 * but they are internally represented as binary floating-point numbers. That
 * leads to imprecision.
 */

0.1 + 0.2
