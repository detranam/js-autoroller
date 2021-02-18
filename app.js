
/*
This application is meant to auto-roll dice to create character sheets for
various role-playing games, such as Cyberpunk 2020 or Dungeons and Dragons.
*/

const { RSA_X931_PADDING } = require('constants')
//required to take input from command line
const readline = require('readline')
//required to output the characters
const fs = require('fs')
const CyberpunkOneShotCharacter = require("./cyberpunk.js")
const Die = require("./die.js")

const rollStats = () => {
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
    characterStats.sort(function (a, b) { return b - a })
    console.log(characterStats)
}

//This acquires your EMP value, which will calculate
//humanity = 10*EMP
//Humanity and empathy are 1:10, every 10 lost humanity is 1 lost empathy, they're tied together. 
//71 humanity is still 8 empathy, 70 humanity is then 7 empathy
const inputEMP = () => {
    return new Promise((resolve, reject) => {
        rl.question("Enter your EMP value... ", function (answer) {
            var EMP = parseInt(answer.trim());
            console.log("Your starting Humanity is %i", EMP * 10);
            resolve();
        })
    })
}

//This acquires the MA value, which will calculate
//run = 3 * MA, usable three times
//leap = run / 4
const inputMA = () => {
    return new Promise((resolve, reject) => {
        rl.question("Enter your MA value... ", function (answer) {
            var MA = parseFloat(answer.trim());
            console.log("Your Run value is %i, usable three times", MA * 3);
            console.log("Your Leap value is %f", MA * 3 / 4);
            resolve();
        })
    })
}

//This acquires the BODY value, which will calculate
//lift = 40*body
//save = body
//BTM = switch(bodyval) 
//  1-2 = 0
//  3-4 = -1
//  5-7 = -2
//  8-9 = -3
//  10 = -4
//  11+ = -5
const inputBA = () => {
    return new Promise((resolve, reject) => {
        rl.question("Enter your BODY value... ", function (answer) {
            var BODY = parseFloat(answer.trim());
            console.log("Your Lift value is %i", BODY * 40);
            console.log("Your Save value is %i", BODY);

            var BTM;
            if ((BODY > 0) && (BODY <= 2)) {
                BTM = 0;
            } else if ((BODY > 2) && (BODY <= 4)) {
                BTM = -1;
            } else if ((BODY > 4) && (BODY <= 7)) {
                BTM = -2;
            } else if ((BODY > 7) && (BODY <= 9)) {
                BTM = -3;
            } else if (BODY == 10) {
                BTM = -4;
            } else {
                BTM = -5;
            }
            console.log("Your BTM value is %i", BTM);
            resolve();
        })
    })
}


// Define our program's running order
// This is for simply printing stats based on input
// const main = async () => {
//     rollStats();
//     await inputEMP();
//     await inputMA();
//     await inputBA();
//     rl.close();
// }

// This main is for fully creating a 'one-shot' Cyberpunk character
const main = async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const d10 = new Die(sides = 10);
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
    var oneshot = new CyberpunkOneShotCharacter("Peotyr Parkyr", characterStats, 0);
    console.log(oneshot);
    rl.close();
}
// Finally run the program
main();