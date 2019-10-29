let data = [
	{id: 1, name: 'test1'},
  {id: 2, name: 'test2'},
  {id: 3, name: 'test3'},
  {id: 4, name: 'test4'},
  {id: 5, name: 'test5'},
  {id: 6, name: 'test6'},
]

_(data)
  .filter((x) => x.id % 2 === 0)
  .thru((x) => {
    updateRes(x)
    .then(updateHtml)
    //.then(updateWithError)
    .catch(catchErrors)
    .finally(cleanUpHtml);
  })
  .value();

Promise.resolve(data)
  .then((data) => _.filter(data, (x) => x.id > 7))
  .then(updateRes)
  .then(updateWithError)
  .then(updateHtml)
  .catch(catchErrors)
  .finally(cleanUpHtml);

function updateRes(arr) {
	console.info('%s seding', arr)
	let promise = new Promise(res, () => {});
  function res(resolve) {
    setTimeout(() => {
      resolve(arr);
    }, 5000);
  }
	return promise;
}

function updateHtml(arr) {
	document.write(_.map(arr, 'id'));
}

function updateWithError(newArr) {
	throw ('some error')
}

function catchErrors(res) {
	console.log('%s whoop', res);
}

function cleanUpHtml() {
	document.write('cleaned up');
}
