var ISO_DATE_REGEXP = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
var DATE_REGEXP = /^(\d{4})-(\d{2})-(\d{2})$/;
var DATETIMELOCAL_REGEXP = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/;
var WEEK_REGEXP = /^(\d{4})-W(\d\d)$/;
var MONTH_REGEXP = /^(\d{4})-(\d\d)$/;
var TIME_REGEXP = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/;

// match everything
/[\s\S]/.test('\n')

// match with backreference
/^(a+)-\1$/.test('a-a')

// match tag
var tagName = /<([^>]+)>[^<]*<\/\1>/;

// greedy and reluctant
'<a> <strong>'.match(/^<(.*)>/)[1]  // greedy
// a> <strong
'<a> <strong>'.match(/^<(.?)>/)[1]  // reluctant
// a

// reluctant tag
var tagName = /<(.+?)>.*?<\/\1>/

// word boundary
/\bell\b/.test('ell')

/*
The literal is compiled at load time. The following code will cause an
exception when it is evaluated:
*/

function foo() {
    /[/;
}

// replacement with backstring

'axb cxd'.replace(/x/g, "[$`,$&,$']")
// 'a[a,x,b cxd]b c[axb c,x,d]d'
