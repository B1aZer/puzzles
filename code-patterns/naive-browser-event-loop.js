// Better implementation is in
// https://github.com/latentflip/loupe
// This does not include task, microprocessor differences

let run = true;
let queue = [];
cycle(0);

function cycle(i) {
	if (!run) {
  	return;
  }
  let f = queue.shift();
  f && f();
	setTimeout(() => {
  	cycle(i+1);
  }, 1000);
}

function subProgram1() {
	queue.push(() => {
  	// do some code
    alert(1);
  })

}

function subProgram2() {
	queue.push(() => {
  	// do some code
    alert(2);
  })
}

function subProgram3() {
	queue.push(() => {
  	// do some code
    throw "test";
  })
}

function returnF() {
	run = false;
}

window.onerror = function(msg, url, line) {
 alert("ERROR: " + msg + "\n" + url + ":" + line);
 return true;
}
