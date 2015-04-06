function tug_o_war(teams) {

var teamArr = [];
var team1 = teams[0];
var team2 = teams[1];

  // map method iterates over both teams, creates new array with sums 
  teamArr = teams.map(function (array) {
    // reduce the elements in array
      return array.reduce(function (a, b) {
        return a + b;
      })
  });

  	// conditional statement series to check for winning teams
	if(teamArr[0] > teamArr[1]) {
		return "Team 1 wins!";
	}

	else if(teamArr[1] > teamArr[0]) {
		return "Team 2 wins!";
	}

	// if the teams are equal to each other, check the anchors
	else if(teamArr[0] === teamArr[1]) {
		// if team 1 anchor is stronger
		if(team1[0] > team2[team2.length -1]) {
			return "Team 1 wins!";
		}

		// if team 2 anchor is stronger
		else if(team2[team2.length - 1] > team1[0]) {
			return "Team 2 wins!";
		}

		else {
			return "It's a tie!";
		}
	}

}

console.log(tug_o_war([[7,6,5,4,6], [6,4,3,7,8]]));

