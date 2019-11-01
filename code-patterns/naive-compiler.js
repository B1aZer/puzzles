function compile(input) {
	let parsed = parse(input);
  let tree = analyze(parsed);
  evaluate(tree);
}

let input = 'per a = 1; print(a);';
compile(input);

function parse(input) {
	return input.split(/[\s;]+/);
}

function analyze(parsed) {
	return parsed;
}

function evaluate(parsed) {
	let variables = {};
	parsed.forEach((ch, i) => {
  	variables[ch === 'per' ? parsed[i+1] : undefined] = parsed[i+3];
    ch.startsWith('print') ? alert(variables[ch[6]]) : undefined;
  });
}
