// Write two functions, every and some, that behave like these methods, except that they take the array as their first 
// argument rather than being a method.

var arr = [1, 2, 3, 4];

 console.log([1,2,3,4].some (function(num) {
	 return num < 2;
 }));

// return true if all elements in array pass function test
function every(array, callback) {
	for(var i = 0; i < array.length; i++) {
		if(!callback(array[i])) {
			return false;
		}

		if(i === array.length - 1) {
			return true
		}
	}
}


// return true of any elements in array pass function test
function some(array, callback) {
	for(var i = 0; i < array.length; i++) {
		if(callback(array[i])) {
			return true;
		}

		if(i === array.length - 1) {
			return false
		}
	}
}


