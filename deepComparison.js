// comparison function that returns true only if two objects are the same value, or 
// are objects with the same properties whose values are also equal

var obj1 = {
	name: "Tommy",
	Age: 25,
	country: "US"
};

var obj2 = {
	name: "Tommy",
	Age: 25,
	dob: 1989
};

var name1 = "tommy";
var name2 = "tommy";


// compares two objects, non-recursive 
function deepEqual(object1, object2) {

	var count1 = 0, count2 = 0;

	// if both are objects, check if has same prop and values
	if(typeof object1 === "object" && typeof object2 === "object" && object1 != null && object2 != null) {

		// check prop number 1
		for(var element in object2) {
			if(object2.hasOwnProperty(element)) {
				count2++;
			}
		}

		// check prop number 2
		for(var element in object1) {
				if(object1.hasOwnProperty(element)) {
				count1++;
			}
		}

		if(count1 != count2) {
			return false;
		}

		// check for same values
		for(var prop in object1) {

			if(object1[prop] != object2[prop]) {
				return false;
			}
		}

		return true;
	}

	else if(object1 === object2) {
			return true;
	}

	else return false;
}


console.log(deepEqual(obj1, obj2));
console.log(deepEqual(name1, name2));