
/*
This application is meant to auto-roll dice to create character sheets for
various role-playing games, such as Cyberpunk 2020 or Dungeons and Dragons.
*/

//const { RSA_X931_PADDING } = require('constants')
//required to take input from command line
//const readline = require('readline')

//required to output the characters
const fs = require('fs')
//
const CyberpunkCharacter = require("./cyberpunk.js")
const Die = require("./die.js")

// const rollStats = () => {
//     const d10 = new Die(sides = 10)
//     //Create an array of size 10 with our correct values in them, to be displayed.
//     var characterStats = [
//         d10.rollTwoDropLowest(),
//         d10.rollTwoDropLowest(),
//         d10.rollTwoDropLowest(),
//         d10.rollTwoDropLowest(),
//         d10.rollTwoDropLowest(),
//         d10.rollTwoDropLowest(),
//         d10.rollTwoDropLowest(),
//         d10.rollTwoDropLowest(),
//         d10.rollTwoDropLowest()
//     ]
//     characterStats.sort(function (a, b) { return b - a })
//     console.log(characterStats)
// }

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
    const d10 = new Die(sides = 10)
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
    let oneshot = new CyberpunkCharacter("Peotyr Parkyr", characterStats, 0)
    await oneshot.initialize();
    console.log(oneshot)
}
// Finally run the program
main()