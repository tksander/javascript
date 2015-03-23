// various callback function tests

// JSON ancestry file
var ancestry = require('./ancestry');
// creates an array of objects
ancestry = (JSON.parse(ancestry));



var testArr = ["tommy", "sander", 1989];
var testObj = {
	firstName: "tommy", 
	lastName: "sanders", 
	DOB: 1990
};



// iterates through an array or object and does something
function forEach(object, callback) {
	// check if object 
	if(typeof object === "object") {

		// check for array 
		if(Array.isArray(object)) {

			// if array of objects
			if(typeof object[0] === "object") {
				for(var i = 0; i < object.length; i++) {
					var currObj = object[i];
					for(var prop in currObj) {
						callback(currObj[prop]);
					}
				}
			}

			// if simple array
			else {
				for(var i = 0; i < object.length; i++) {
					callback(object[i]);
				}
			}
		}

		// else it's an object
		else {
			for(var prop in object) {
				callback(object[prop]);
			}
		}
	}
}

// filters an array
function filterEasy(array, test) {
	var list = [];

	for(var i = 0; i < array.length; i++) {
		if(test(array[i])) {
			list.push(array[i]);
		}
	}
	return list;
}


 var listPrint = filterEasy(testArr, function (value) {
	return value < 2000;
 });
 console.log(listPrint);


 // function that filters out values in an object into an array that don't pass a test
function filter(object, test) {
	var list = [];
	// iterate through the object
	forEach(object, function (data) {
		if(test(data)) {
			list.push(data);
		}
	})
	return list; 
}

// maps an array into another array , and transforms the entry
function map(arr, transform) {
	var newArr = [];
	forEach(arr, function(value) {
		newArr.push(transform(value));
	});
	return newArr;
}


// find all number data in object or array
var ancestryNums = (filter(ancestry, function(number) {
	return typeof number === "number";
}));


// creates an object by name pointing to corresponding object
var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});
console.log(byName)









