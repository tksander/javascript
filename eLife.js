/* Questions for Hart:
** - This program makes use of the prototype property to create methods. Is this a normal way to create object properties?
** - Line 185: I'm just grasping "this" and call/apply/bind. Here I'm unsure what this is referring to. 
** - Line 51: I could use a conversation on Getter/Setters. I'll read up on this more though. 
** - Line 343: The "eat" method has some logic I do not understand. I've commented at the method
**
**
*/


var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];




// object literal, world object
var world = {};

// vector object constructor
function Vector(x, y) {
	this.x = x;
	this.y = y;
}

// prototype to add vector together, returns new vector
Vector.prototype.plus = function(other) {
	return new Vector(this.x + other.x, this.y + other.y);	
}

// grid, property of world object
function Grid(width, height) {
	this.space = new Array(width * height);  // ?: how do I populate the array?
	this.width = width;
	this.height = height;
}

// returns true if the vector is valid/inside the grid
Grid.prototype.isInside = function(vector) {
	return vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height;
};

// returns the value at that coordinate
Grid.prototype.get = function(vector) {
	return this.space[vector.x + this.width * vector.y];
}

// sets value for vector
Grid.prototype.set = function(vector, value) {
	this.space[vector.x + this.width * vector.y] = value;
}

// creates an object that defines directions
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};


// function declaration that returns random int within array length 
function randomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

// creates an array of directions
var directionNames = "n ne e se s sw w nw".split(" ");

// object constructor for object that randomly selects direction name, assigns to direction prop
function BouncingCritter() {
	this.direction = randomElement(directionNames);
};

// adds prototype to bouncingcritter object called "act", takes parameter view
BouncingCritter.prototype.act = function(view) {
	// if the direction is not clear
	if (view.look(this.direction) != " ") {
		// look for open space
		this.direction = view.find(" ") || "s";
	}
	// return an object that stores the type of action and the direction
	return {
		type: "move", 
		direction: this.direction
	};
}

// stores chars in element???
function elementFromChar(legend, ch) {
	if (ch == " ") {
		return null;
	}
	var element = new legend[ch]();  // In elementFromChar, first we create an instance of the right type by looking up the character’s constructor and applying new to it. 
	element.originChar = ch;
	return element;
}

// creates world object, stores grid dims, and stores legend object
// legend object stores chars for props and objects for values
function World(map, legend) {
	var grid = new Grid(map[0].length, map.length);
	this.grid = grid;
	this.legend = legend;

	// iterates through each element of map array
	map.forEach(function(line, y) {
	for (var x = 0; x < line.length; x++) 
		// set the grid coordinate to the current x, y coordinate
		// and set the value of that coordinate to a new object using
		// the object constructor for that specific char
		grid.set(new Vector(x, y),
			elementFromChar(legend, line[x]));	
	});
}

// converts from elements to chars
function charFromElement(element) {
	if (element == null)
		return " ";
	else
		return element.originChar;
}

// adds toString prototype to World object
// stores each element as a char in string
World.prototype.toString = function() {
	var output = "";
	for (var y = 0; y < this.grid.height; y++) {
		for (var x = 0; x < this.grid.width; x++) {
			var element = this.grid.get(new Vector(x, y)); // HART: I'm confused by the "new" throughout. How/why can we access the vector by new here?
			output += charFromElement(element);
		}
		output += "\n";
	}
	return output;
};

// creates wall object
function Wall() {}

// instatiate world object through world object
var world = new World(plan, {"#": Wall, "o": BouncingCritter});
console.log(world.toString());



// calls function for each element in grid
// context is used for call method to attribute "this" to a specific object for the function call
Grid.prototype.forEach = function(f, context) {
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var value = this.space[x + y * this.width];
			// if the value at that coordinate is not empty, then call the function on that object
			// pass arguments value and the vector
			if (value != null)
				f.call(context, value, new Vector(x, y));
		}
	}
};


// adds turn method to World object
World.prototype.turn = function() {	
	var acted = [];
	// for each function iterates through entire grid, and applies function to each coordinate with a char
	this.grid.forEach(function(critter, vector){ 
		// if critter has an act prop and is not in acted array
		if (critter.act && acted.indexOf(critter) == -1) {
			// add critter to acted array
			acted.push(critter);
			// ???
			this.letAct(critter, vector);
		}
	// provide context, refers to the ?????????????????????????????????????????????
	}, this);
}

// method that allows the critters to move 
World.prototype.letAct = function(critter, vector) {
	// stores the critter's act, act returns an object with "move" type and "this.direction: direction"
	// act takes an arugment "view"
	// action returns a movement of some kind
	var action = critter.act(new View(this, vector));
	// if action exists and action type if move
	if (action && action.type == "move") {
		// check to see if the destinnation is valid
		var dest = this.checkDestination(action, vector);
		// if destination is valid and is empty
		if (dest && this.grid.get(dest) == null) {
			// set the current location to emtpy
			this.grid.set(vector, null);
			// set the destination to be the critter object
			this.grid.set(dest, critter);
		}
	}
};

// check if destination is valid
World.prototype.checkDestination = function(action, vector) {
	// check if destination object has direction 
	if (directions.hasOwnProperty(action.direction)) {
		// destination is the sum of the current coordinate and the direction vector
		var dest = vector.plus(directions[action.direction]);
		// this refers to referenced world object
		// isInside method check if the dest is within the grid dims
		if (this.grid.isInside(dest))
			// if its valid, return the dest
			return dest;
	}
}

// constr obj, stores world and vector
function View(world, vector) {
	this.world = world;
	this.vector = vector;
}
// add look method to View, takes a direction, stores the sum of current coordinate vector
// plus direction vector in target; if the new vector is not outside the grid
View.prototype.look = function(dir) {
	var target = this.vector.plus(directions[dir]);
	if (this.world.grid.isInside(target))
		// return char at that destination
		return charFromElement(this.world.grid.get(target));
	else
		// if it's outside the grid, it returns a wall so critters stay on the map
		return "#";
};
// returns ALL the directions of a char
View.prototype.findAll = function(ch) {
	var found = [];
	for (var dir in directions)
		if (this.look(dir) == ch)
			found.push(dir);
		return found;
};
// returns a single direction of all chars found adjacent
View.prototype.find = function(ch) {
	//  store an array of directions at which to find char
	var found = this.findAll(ch);
	// if did not find any chars, return null
	if (found.length == 0) return null;
	// otherwise, return a random selection from the direction
	return randomElement(found);
}

// iterates through 5 turns **************
for (var i = 0; i < 5; i++) {
	world.turn();
	// prints out the grid as string
	console.log(world.toString());
}


function dirPlus(dir, n) {
	// stores index of direction (using the string)
	var index = directionNames.indexOf(dir);
	// returns the resulting direction, modulo allows for numbers that exceed array size
	return directionNames[(index + n + 8) % 8];
}


function WallFlower() {
	// "s" ??????????????????????
	this.dir = "s";
}

// creates act method for WallFlower prototype 
WallFlower.prototype.act = function(view) {
	// how does the compass feature work????????
	var start = this.dir;
	if(view.look(dirPlus(this.dir, -3)) != " ")
		start = this.dir = dirPlus(this.dir, -2);
	while (view.look(this.dir) != " ") {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir == start) break;
  }
  return {type: "move", direction: this.dir};
};

// 
function LifelikeWorld(map, legend) {
	World.call(this, map, legend);
}

// assigns the prototye of world to LikelikeWorld
LifelikeWorld.prototype = Object.create(World.prototype);

// ensures actionTypes object has no prototypes
var actionTypes = Object.create(null);

// ????????????????????? 
LifelikeWorld.prototype.letAct = function(critter, vector) {
	var action = critter.act(new View(this, vector));
	var handled = action &&
		action.type in actionTypes &&
		actionTypes[action.type].call(this, critter, vector, action);
	if (!handled) {
		critter.energy -= 0.2;
		if(critter.energy <= 0)
			this.grid.set(vector, null);
	}
};

// if action object returns {type: "grow"}
actionTypes.grow = function(critter) {
	critter.energy += 0.5;
	return true;
}

// move
actionTypes.move = function(critter, vector, action) {
	// check if direction is valid direction
  var dest = this.checkDestination(action, vector);
  // if checkDestination returns an invalid location, energy is too low, or dest is not empty
  if (dest == null || critter.energy <= 1 || 
  	  this.grid.get(dest) != null)
    return false;
	// subtract the energy required to move
  critter.energy -= 1;
  // set current location to empty
  this.grid.set(vector, null);
  // set destination to critter
  this.grid.set(dest, critter);
  return true;
};

// eat action
actionTypes.eat = function(critter, vector, action) {
  // check if destination is valid
  var dest = this.checkDestination(action, vector);
  // 
  var atDest = dest != null && this.grid.get(dest); // HART: does this return a boolean????
  
  if (!atDest || atDest.energy == null) // HART: How can atDest be a boolean and an object (accessing the energy prop??)
    return false;
  // if its a valid dest, then take energy and delete the object
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

actionTypes.reproduce = function(critter, vector, action) {
	var baby = elementFromChar(this.legend, critter.originChar);
var dest = this.checkDestination(action, vector);
if (dest == null || critter.energy <= 2 * baby.energy ||
	this.grid.get(dest) != null)
	return false;
critter.energy -= 2 * baby.energy;
this.grid.set(dest, baby);
return true;
}

function Plant() {
  this.energy = 3 + Math.random() * 4;
}

Plant.prototype.act = function(context) {
  if (this.energy > 15) {
    var space = context.find(" ");
    if (space)
      return {type: "reproduce", direction: space};
  }
  if (this.energy < 20)
    return {type: "grow"};
};

function PlantEater() {
  this.energy = 20;
}

PlantEater.prototype.act = function(context) {
  var space = context.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};
  var plant = context.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if (space)
    return {type: "move", direction: space};
};


/* 
- eats until plant extinction
- randomized movement (view.find) inneffective to find plants
- breed very fast

Write a new critter type that tries to address one or more of these points and substitute it for
 the old PlantEater type in the valley world. See how it fares. Tweak it some more if necessary. */

function SmartPlantEater() {
	this.energy = 20; // PLACEHOLDER
};


SmartPlantEater.prototype.act = function(context) {
  // 
  var space = context.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};
  var plant = context.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if (space)
    return {type: "move", direction: space};
};

// HART: Trying to track each time the program runs
SmartPlantEater.prototype.meal = function() {
	var counter = 0;
	var readyToEat = counter = 3;
	if(world.turn()) {
		counter++;
	}
}



 


