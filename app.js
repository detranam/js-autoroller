
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

//This acquires your EMP value, which will calculate
//humanity = 10*EMP
new Promise((resolve, reject) => {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Enter your EMP value... ", function (answer) {
        var EMP = parseInt(answer.trim());
        console.log("Your Humanity is %i", EMP*10);
        rl.close();
    });
})



//This acquires the MA value, which will calculate
//run = 3 * MA, usable three times
//leap = run / 4
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Enter your MA value... ", function (answer) {
    var MA = parseFloat(answer.trim());
    console.log("Your Run value is %i, usable three times", MA * 3);
    console.log("Your Leap value is %f", MA * 3 / 4);
    rl.close();
});

// //This acquires the BODY value, which will calculate
// //lift = 40*body
// //save = body
// //BTM = switch(bodyval) 
// //  1-2 = 0
// //  3-4 = -1
// //  5-7 = -2
// //  8-9 = -3
// //  10 = -4
// //  11+ = -5
// var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// rl.question("Enter your BODY value... ", function (answer) {
//     var BODY = parseFloat(answer.trim());
//     console.log("Your Lift value is %i", BODY * 40);
//     console.log("Your Save value is %i", BODY);
//     var BTM = 0;
//     if ((BODY > 2) && (BODY <= 4)){
//         BTM = -1;
//     } else if ((BODY > 4) && (BODY <= 7)) {
//         BTM = -2;
//     } else if ((BODY > 7) && (BODY <= 9)){
//         BTM = -3;
//     } else if (BODY == 10) {
//         BTM = -4;
//     } else {
//         BTM = -5;
//     }
//     console.log("Your BTM value is %i", BTM);
//     rl.close();
// });