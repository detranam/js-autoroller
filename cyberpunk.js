module.exports = class CyberpunkOneShotCharacter {
    /**
     * Constructor to create a new character, will call all necessary
     * @param {String}    name                  the character's name
     * @param {Int8Array} baseStats             the size 9 array containing all stats
     * @param {Number}    recentlyFinishedLevel the most recently finished level
     */
    constructor(name, baseStats, recentlyFinishedLevel) {
        this.filePath = "cyberpunk"
        this.name = name
        this.int = baseStats[0]
        this.ref = baseStats[1]
        this.tempref = baseStats[1]
        this.tech = baseStats[2]
        this.cool = baseStats[3]
        this.attr = baseStats[4]
        this.luck = baseStats[5]
        this.ma = baseStats[6]
        this.body = baseStats[7]
        this.emp = baseStats[8]
        this.tempemp = baseStats[8]

        this.currentLevel = parseInt(recentlyFinishedLevel) //ensure the level is an int
        this.deriveOtherStats()
        this.generateJobSkillsMoney()
        this.assignWeapons()
    }
    assignWeapons() {
        //TODO: Don't forget to include different 'precision' values into the '100' below,
        //as the 100 should be replaced with 10**(2 + precision), precision decided from the given decided file.
        //As a simple outline for later:
        //  roll for primary percent chance
        //  load file for the randomly chosen primary
        //  grab the 'precision'
        //  roll randomly in that precision, then with that index assign the weapon

        //Also important, the location of the files to load will be base named after this file: thus
        //for all new RPG modules we would need a RPG_module.js file, then a directory of the same name
        //with the 'percentages' json file, and all the other files necessary. This is a good place to
        //start utilizing inheritance.
        var percents = 
        var primary = Math.floor((Math.random() * precision??) + 1)
        var secondary = Math.floor((Math.random() * precision??) + 1)
        //TODO: make sure to take into account if there's a number before the json name that you roll 
        //for two of that kind of weapon
    }
    /**
     * Derives some other 'secondary' statistics for the character
     */
    deriveOtherStats() {
        this.run = this.ma * 3
        this.leap = Math.round(this.run / 4)
        this.lift = this.body * 40
        this.save = this.body
        this.humanity = this.emp * 10
        //BTM is really the only stat that's problematic to solve
        if ((this.body > 0) && (this.body <= 2)) {
            this.btm = 0
        } else if ((this.body > 2) && (this.body <= 4)) {
            this.btm = -1
        } else if ((this.body > 4) && (this.body <= 7)) {
            this.btm = -2
        } else if ((this.body > 7) && (this.body <= 9)) {
            this.btm = -3
        } else if (this.body == 10) {
            this.btm = -4
        } else {
            this.btm = -5
        }
    }

    /**
     * Generate the character's job, skills, and money based on the 
     * 'previously completed level'
     */
    generateJobSkillsMoney() {
        var randomRole = Math.floor((Math.random() * 10) + 1)
        switch (randomRole) {
            case 1:
                this.role = 'Rockerboy'
                break
            case 2:
                this.role = 'Solo'
                break
            case 3:
                this.role = 'Netrunner'
                break
            case 4:
                this.role = 'Techie'
                break
            case 5:
                this.role = 'Medtechie'
                break
            case 6:
                this.role = 'Media'
                break
            case 7:
                this.role = 'Cop'
                break
            case 8:
                this.role = 'Corporate'
                break
            case 9:
                this.role = 'Fixer'
                break
            case 10:
                this.role = 'Nomad'
                break
            default:
                //Ideally this should never be reached, if we did reach it, just cry
                throw 'randomRole() somehow got a value that is not between 1 and 10!'
        }
        //now we take into account if the character is created at the start or in the middle of the campaign
        this.money = 8000 + this.currentLevel * 2000
        this.classSkillPoints = 40 + this.currentLevel * 5
        this.standardSkillPoints = 20 + this.currentLevel * 3
    }
    /**
     * This helper function takes an array of percents in, with each percent corresponding to a percent chance
     * of something happening. This also takes in a percent, which was randomly 
     * @param {*} percentArray 
     * @param {*} desiredPercent 
     * @returns the index of the given desiredPercent in the array of given percents
     */
    getPercentByIndex(percentArray, desiredPercent) {
        var totalPercent = 0
        var index = 0
        var onward = true
        var finalIndex = 0

        percentArray.forEach(element => {
            totalPercent += element
            if (desiredPercent <= totalPercent) {
                onward = false
                finalIndex = index
            }
            if (onward) {
                index++
            }
        })
        return finalIndex
    }

    /**
     * ForMat STat is why this function is poorly named
     * This helper method is only used when printing out the character sheet, as it will convert
     * single digit numbers (4) to (04), allowing for a nicer looking table in the output.
     * @param {Number} stat (integer) stat to be given filler zeroes, if necessary
     */
    _fmst(stat) {
        return ('0' + stat).slice(-2)
    }

    /**
     * This prints the character to an easily human-readable {NAME}.txt file
     */
    printCharacterToTxt() {
        //Print the header portion
        sheet =
            "============================================================" + //60*'='
            "[NAME: " + this.name + "] ROLE: [" + this.role + "]\n" +
            "============================================================" //60*'='
        //Print the first line of stats
        sheet +=
            "|[COOL " + this._fmst(this.cool) + "] [INT  " + this._fmst(this.int) + "]" +
            "[TECH" + this._fmst(this.tech) + "] [ATTR " + this._fmst(this.attr) + "]|\n"
        //Print second line of stats
        sheet +=
            "|[LUCK " + this._fmst(this.luck) + "] [MA   " + this._fmst(this.ma) + "]" +
            "[BODY " + this._fmst(this.body) + "] [RUN  " + this._fmst(this.run) + "]|\n"
        //Print the third line of stats
        sheet +=
            "|[LEAP " + this._fmst(this.leap) + "] [LIFT " + this._fmst(this.lift) + "]" +
            "[REF |" + this._fmst(this.tempref) + "/" + this._fmst(this.ref) + "]       |\n"
        //Print the final line of status
        sheet +=
            "|          [EMP |" + this._fmst(this.tempemp) + "/" + this._fmst(this.emp) + "]                 |"
    }
}