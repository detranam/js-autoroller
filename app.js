
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
        var firstRoll = Math.floor((Math.random() * this.sides) + 1);
        var secondRoll = Math.floor((Math.random() * this.sides) + 1);
        return firstRoll > secondRoll ? firstRoll : secondRoll;
    }
}

class CyberpunkCharacter {
    // Randomly assigns stats
    constructor(name, baseStats, recentlyFinishedLevel) {
        this.name = name;
        this.int = baseStats[0];
        this.ref = baseStats[1];
        this.tech = baseStats[2];
        this.cool = baseStats[3];
        this.attr = baseStats[4];
        this.luck = baseStats[5];
        this.ma = baseStats[6];
        this.body = baseStats[7];
        this.emp = baseStats[8];
        this.currentLevel = recentlyFinishedLevel;
        this.deriveOtherStats();
        this.generateJobSkillsMoney();
    }
    // Create all other stats based on the base stats
    deriveOtherStats() {
        this.run = this.ma * 3;
        this.leap = this.run / 4;
        this.lift = this.body * 40;
        this.save = this.body;
        this.humanity = this.emp * 10;
        //BTM is really the only stat that's problematic to solve
        if ((this.body > 0) && (this.body <= 2)) {
            this.btm = 0;
        } else if ((this.body > 2) && (this.body <= 4)) {
            this.btm = -1;
        } else if ((this.body > 4) && (this.body <= 7)) {
            this.btm = -2;
        } else if ((this.body > 7) && (this.body <= 9)) {
            this.btm = -3;
        } else if (this.body == 10) {
            this.btm = -4;
        } else {
            this.btm = -5;
        }
    }
    generateJobSkillsMoney() {
        var randomRole = Math.floor((Math.random() * 10) + 1);
        switch (randomRole) {
            case 1:
                this.role = 'Rockerboy';
                break;
            case 2:
                this.role = 'Solo';
                break;
            case 3:
                this.role = 'Netrunner';
                break;
            case 4:
                this.role = 'Techie';
                break;
            case 5:
                this.role = 'Medtechie';
                break;
            case 6:
                this.role = 'Media';
                break;
            case 7:
                this.role = 'Cop';
                break;
            case 8:
                this.role = 'Corporate';
                break;
            case 9:
                this.role = 'Fixer';
                break;
            case 10:
                this.role = 'Nomad';
                break;
            default:
                //Ideally this should never be reached, if so, just cry
                throw 'randomRole() somehow got a value that is not between 1 and 10!';
                break;
        }
        this.money = 8000 + this.currentLevel*2000;
        this.classSkillPoints = 40 + this.currentLevel*5;
        this.standardSkillPoints = 20 + this.currentLevel*3
    }
}

const { RSA_X931_PADDING } = require('constants');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    characterStats.sort(function (a, b) { return b - a });
    console.log(characterStats);
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
    var oneshot = new CyberpunkCharacter("Peotyr Parkyr", characterStats, 0);
    console.log(oneshot);
    rl.close();
}
// Finally run the program
main();