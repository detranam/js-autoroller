
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
        var first_roll = Math.floor((Math.random() *this.sides) + 1);
        var second_roll = Math.floor((Math.random() * this.sides) + 1);
        return first_roll > second_roll ? first_roll : second_roll;
    }
}

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
    d10.rollTwoDropLowest(),
    d10.rollTwoDropLowest()
]

characterStats.sort(function(a,b){return b-a});

console.log(characterStats);










// var readline = require('readline');

// var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question("What do you think of node.js? ", function (answer) {
//     // TODO: Log the answer in a database
//     console.log("Thank you for your valuable feedback:", answer);

//     rl.close();
// });

// //Return a random number between 1 and 10:

// Math.floor((Math.random() * 10) + 1);