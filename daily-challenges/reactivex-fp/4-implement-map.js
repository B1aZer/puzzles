Array.prototype.map = function(projectionFunction) {
	var results = [];
	this.forEach(function(itemInArray) {
    results.push( projectionFunction(itemInArray));
	});

	return results;
};

// JSON.stringify([1,2,3].map(function(x) { return x + 1; })) === '[2,3,4]'
