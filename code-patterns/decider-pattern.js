function mainProgram(i) {
	if (i === 1) {
  	return subProgram(i);
  } else if (i === 2) {
  	return subProgram(i);
  } else if (i === 3) {
  	return subProgram(i);
  } else {
  	console.log('fnd');
  	return;
  }
}

function subProgram(i) {
	return mainProgram(i+1);
}

mainProgram(1);
