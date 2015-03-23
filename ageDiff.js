// compute the average age difference between mothers and children

// JSON ancestry file
var ancestry = require('./ancestry');
ancestry = (JSON.parse(ancestry));


// creates series of objects by name
var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});
 
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}


// filters object for those with mothers
var filteredAncestry = ancestry.filter(function(person) {
		return byName[person.mother] != null;
	});	


var ageArr = filteredAncestry.map(function(person) {
	return person.born - byName[person.mother].born;
});



var avg = average(ageArr);
console.log(avg);


