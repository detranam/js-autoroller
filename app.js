
/*
This application is meant to auto-roll dice to create character sheets for
various role-playing games, such as Cyberpunk 2020 or Dungeons and Dragons.
*/

class Die {
    constructor(sides) {
        this.sides = sides;
    }
    roll() {
        return Math.floor((Math.random() * this.sides) + 1);
    }
    rollTwoDropLowest() {
        var first_roll = Math.floor((Math.random() * this.sides) + 1);
        var second_roll = Math.floor((Math.random() * this.sides) + 1);
        return first_roll > second_roll ? first_roll : second_roll;
    }
}

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var statNames = [
    "INT",
    "REF",
    "TECH",
    "COOL",
    "ATTR",
    "LUCK",
    "MA",
    "BODY",
    "EMP"
]

const d10 = new Die(sides = 10);
//Create an array of size 10 with our correct values in them, to be displayed.
var characterStats = [
    d10.rollTwoDropLowest(),
    d10.rollTwoDropLowest(),
    d10.rollTwoDropLowest(),
    d10.rollTwoDropLowest(),
    d10.rollTwoDropLowest(),
    d10.rollTwoDropLowest(),
    d10.rollTwoDropLowest(),
    d10.rollTwoDropLowest(),
    d10.rollTwoDropLowest()
]

characterStats.sort(function (a, b) { return b - a });
console.log(characterStats);

/*
TODO: I want to give the user the ability to assign their own points, so that
the 'input' where we ask for their stats can be excluded.
*/

var response; //EMP value
rl.question("Enter your EMP value... ", function (answer) {
    response = answer.trim();
    rl.close();
});


console.log(response);
//var EMP = parseInt(response);
//console.log("Your humanity is %i", EMP*10);


// rl.question("Enter your EMP value: ", function (answer) {
//     response = answer;
//     rl.close();
// });