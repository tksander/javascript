function returnSpecifics(obj){

    var arr = [];
    var count = 0;
    
    // check for empty object
    for(var propA in obj) {
        if(obj.hasOwnProperty(propA)) {
            count++;
        }
    }

    if(count == 0) {
        arr.push("The Object is Empty");
        return arr;
    }
    
    // iterate through the object, look for numbers
    for(var propNum in obj) {
        if(typeof obj[propNum] === "number") {
            arr.push(obj[propNum]);
        }
    }
    
    // iterate through the object, look for methods
    for(var propF in obj) {
        if(typeof obj[propF] === "function") {
            arr.push(propF);
        }
    }  

    return arr;
}

//object literal
var testObject = {
    age: 25,
    height: 6,
    weight: 180,
    methodName: function(input) {
        // do something
    },
    cars: 1
}


var emptyObj = {};


//console.log(returnSpecifics(emptyObj));
console.log(returnSpecifics(emptyObj));