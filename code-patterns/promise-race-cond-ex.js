let sharedArray = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Doe",
  },
]

run();

function run() {
	request1Post();
  request2update();
}

function request1Post() {
	return new Promise((res, rej) => {
  	setTimeout(() => {
   		res({id: 3, name: "John"});
    }, Math.random() * 10);
  }).then((obj) => {
  	sharedArray.unshift(obj);
  });
}

function request2update() {
  //let takeFirst = sharedArray[0];
  return new Promise((res, rej) => {
  	setTimeout(() => {
   		res();
    }, Math.random() * 10);
  }).then((obj) => {
  	document.body.innerHTML = sharedArray[0].id;
  });
}

function writeAfterTimeout() {
	// async event
	setTimeout(() => {
    document.body.innerHTML = sharedArray[0].id;
  }, Math.random() * 10);
}
