module.exports = class CyberpunkOneShotCharacter {
    /**
     * Constructor to create a new character, will call all necessary
     * @param {String}    name                  the character's name
     * @param {Int8Array} baseStats             the size 9 array containing all stats
     * @param {Number}    recentlyFinishedLevel the most recently finished level
     */
    constructor(name, baseStats, recentlyFinishedLevel) {
        this.filePath = "./cyberpunkfiles/"
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
        this.weaponList = []
        this.role = "UNASSIGNED"
        this.specialAbility = "UNASSIGNED"

        this.currentLevel = parseInt(recentlyFinishedLevel) //ensure the level is an int
    }

    /**
     * Initializes all portions of a character including their derived stats, weapons,
     * armor, and cybernetics.
     * @returns a Promise to allow for 'waiting' on character to be fully created
     */
    initialize() {
        return this.deriveOtherStats()
            .catch((error) => { console.error("Error in deriveOtherStats: " + error) })
            .then(this.assignWeapons())
            .catch((error) => { console.error("Error in assignWeapons: " + error) })
    }

    /**
     * Derives some other 'secondary' statistics for the character.
     * NOTE: This function strictly does math-related functions, no file system 
     * interaction.
     * @returns a Promise to ensure that all the base statistics are in place
     */
    deriveOtherStats() {
        return new Promise((resolve, reject) => {
            //derive our math-related attributes
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

            //decide our role
            let randomRole = Math.floor((Math.random() * 10) + 1)
            switch (randomRole) {
                case 1:
                    this.role = 'Rockerboy'
                    this.specialAbility = 'Charismatic Leadership'
                    break
                case 2:
                    this.role = 'Solo'
                    this.specialAbility = 'Combat Sense'
                    break
                case 3:
                    this.role = 'Netrunner'
                    this.specialAbility = 'Interface'
                    break
                case 4:
                    this.role = 'Techie'
                    this.specialAbility = 'Jury Rig'
                    break
                case 5:
                    this.role = 'Medtechie'
                    this.specialAbility = 'Medical Tech'
                    break
                case 6:
                    this.role = 'Media'
                    this.specialAbility = 'Credibility' //lol
                    break
                case 7:
                    this.role = 'Cop'
                    this.specialAbility = 'Authority'
                    break
                case 8:
                    this.role = 'Corporate'
                    this.specialAbility = 'Resources'
                    break
                case 9:
                    this.role = 'Fixer'
                    this.specialAbility = 'Streetdeal'
                    break
                case 10:
                    this.role = 'Nomad'
                    this.specialAbility = 'Family'
                    break
                default:
                    //Ideally this should never be reached, if we did reach it, just cry and error it out
                    console.error('randomRole somehow got a value that is not between 1 and 10!')
            }

            //now we take into account if the character is created at the start or in the middle of a campaign by
            //tweaking the amount of skill points and money they have
            this.money = 8000 + this.currentLevel * 2000
            this.classSkillPoints = 40 + this.currentLevel * 5
            this.standardSkillPoints = 20 + this.currentLevel * 3

            resolve();
        })
    }

    /**
     * This helper function takes an array of percents in, with each percent corresponding to a percent chance
     * of something happening. This also takes in a percent, which was randomly created.
     * @param {*} percentArray      The ordered array of percents to be iterated through
     * @param {*} desiredPercent    The percent we rolled, and desire to know the index of
     * @returns the index of the given desiredPercent in the array of given percents
     */
    getIndexByPercent(percentArray, desiredPercent) {
        let totalPercent = 0
        let index = 0
        let onward = true
        let finalIndex = -1

        try {
            for (let i = 0; i < percentArray.length; i++) {
                const element = percentArray[i];
                //Ensure to parse as a float, or else it may be string
                totalPercent += parseFloat(element["%"])
                if (desiredPercent <= totalPercent) {
                    onward = false
                    finalIndex = index
                }
                if (onward) {
                    index++
                }
            }
        } catch (error) {
            console.error(error)
        }
        if (finalIndex == -1) {
            //if we have a malformed JSON file, the fileIndex may never be set,
            //so this would be the place to throw that error!
            throw "ERROR: This file must be broken, finalIndex is -1!\n"
        }
        return finalIndex
    }

    getAndAssignWeapons(filepath, precision, iterations = 1) {
        return new Promise((resolve, reject) => {
            const weaponOptions = require(filepath)
            //declare all of these beforehand in order to save on memory allocation
            let weaponPercent = -1
            let weaponIndex = -1
            let chosenWeapon = -1
            for (let index = 0; index < iterations; index++) {
                weaponPercent = Math.floor((Math.random() * 10 ** (2 + precision)) + 1) / parseFloat(10**precision)
                weaponIndex = this.getIndexByPercent(weaponOptions, weaponPercent)
                chosenWeapon = Object.values(weaponOptions)[weaponIndex]
                //TODO: So, there is no weapon that is last in our weapon.json list that has a tandem weapon, so we don't need
                //additional safeguards- just check if the next weapon in the list has a '%' value of 'T' for 'tandem weapon'
                this.weaponList.push(chosenWeapon)
                console.log("for filepath " + filepath)
                console.log("weaponpercent is " + weaponPercent)
                console.log("weap index is " + weaponIndex)
            }
            resolve();
        })
    }

    /**
     * Assigns the primary and secondary weapons randomly based on 'percents.json'
     * @returns a Promise to allow for other settings to be completed first
     */
    assignWeapons() {
        return new Promise((resolve, reject) => {
            //grab the overall percents file
            const percents = require(this.filePath + 'percents.json')
            //Assign primary weapon time!
            const primaryPercents = Object.values(percents.primary)
            //TODO: this was set to 17 to try to fix the '-' error.
            let primaryChooser = 17 //Math.floor((Math.random() * 100) + 1)

            let primaryDecisionIndex = this.getIndexByPercent(primaryPercents, primaryChooser)
            let filename = Object.keys(percents.primary)[primaryDecisionIndex]


            let primaryFilePath = this.filePath + filename
            let primaryPrecision = primaryPercents[primaryDecisionIndex]['precision']
            console.log("primarychooser: " + primaryChooser)
            console.log("primarydecisionindex: " + primaryDecisionIndex)

            this.getAndAssignWeapons(primaryFilePath, primaryPrecision)

            //TODO: Secondary weapons, when choosing TWO of them, does not work. Fix!
            //Assign secondary weapons now
            const secondaryPercents = Object.values(percents.secondary)
            let secondaryChooser = Math.floor((Math.random() * 100) + 1)
            //TODO: this is manually set to 7 to allow for debugging
            let secondaryDecisionIndex = 7//this.getIndexByPercent(secondaryPercents, secondaryChooser)
            filename = Object.keys(percents.secondary)[secondaryDecisionIndex]

            let timesToRun = parseInt(filename[0])
            if (!Object.is(NaN, timesToRun)) { //if this returns an int, the first char WAS a number, thus we have to run that many times
                filename = filename.slice(1)
            } else {
                timesToRun = 1;
            }

            let secondaryFilePath = this.filePath + filename
            let secondaryPrecision = secondaryPercents[secondaryDecisionIndex]['precision']
            console.log("secondarychooser: " + secondaryChooser)
            console.log("secondaryFilepath: " + secondaryFilePath)

            this.getAndAssignWeapons(secondaryFilePath, secondaryPrecision, timesToRun)
            resolve();
        })

    }

    /**
     * ForMat STat is why this function is (so very) poorly named
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
        let sheet =
            "========================================\n" + //40*'='
            "[NAME: " + this.name + "] ROLE: [" + this.role + "]\n" +
            "========================================\n" //40*'='
        //Print the first line of stats
        sheet +=
            "|[COOL " + this._fmst(this.cool) + "] [INT  " + this._fmst(this.int) + "]" +
            "[TECH " + this._fmst(this.tech) + "] [ATTR " + this._fmst(this.attr) + "]|\n"
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
            "|          [EMP |" + this._fmst(this.tempemp) + "/" + this._fmst(this.emp) + "]                |\n"
        sheet +=
            "========================================\n" //40*'_'
        //Print the created header and weapons
        console.log(sheet)
        //TODO: Improve the 'weaponList' output to not just be a JSON Dump, maybe a helper function
        console.log(this.weaponList)
        //TODO: Print out armor and cybernetics
    }
}