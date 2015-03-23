// computes average age by century

// JSON ancestry file
var ancestry = require('./ancestry');
// creates an array of objects
ancestry = (JSON.parse(ancestry));
//console.log(ancestry);


var byCent = {};
// iterate through each array object
ancestry.forEach(function(person) {
	// use the function's century to sort
  	var century = Math.ceil(person.died / 100)
  	//console.log(person);
  		// if century already exists, put the object to the array
  		if(century in byCent) {
  			byCent[century].push(person);
  		}
  		// if century does not exist, create an array of one object for the century property
  		else {
  			byCent[century] = [person];
  		}
});

 
// find the age of each person
for(century in byCent) {
	// iterate through each element in each century array and find the age of the person
	var byCentAge = byCent[century].map(function(person) {
		return person.died - person.born;
	});
	console.log(century + ":" + average(byCentAge))
}


function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}


