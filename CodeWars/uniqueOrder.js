var uniqueInOrder=function(iterable){

  // convert string to an array
  if(typeof iterable === "string") {
    iterable = iterable.split("");
  }

  // create array to stor unique
      var uniqueArr = [];
      
      // iterate over each element
      iterable.reduce(function(prev, curr) { 
          // store value if does not match previous value
          if(prev !== curr) {
              uniqueArr.push(curr);
          }

          return curr;
      }, null);

      return uniqueArr;
}


var arr = uniqueInOrder('AAAABBBCCDAABBB');
console.log(arr);


