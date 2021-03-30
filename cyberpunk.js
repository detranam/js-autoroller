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

        this.currentLevel = parseInt(recentlyFinishedLevel) //ensure the level is an int

    }

    async initialize() {
        await this.deriveOtherStats()
            .catch((error) => { console.error("Error in deriveOtherStats: " + error) })
            .then(() => this.generateJobSkillsMoney())
            .catch((error) => { console.error("Error in generateJobSkillsMoney: " + error) })
            .then(() => this.assignWeapons())
            .catch((error) => { console.error("Error in assignWeapons: " + error) })
    }

    /**
     * Derives some other 'secondary' statistics for the character
     */
    deriveOtherStats() {
        return new Promise((resolve, reject) => {
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
            resolve();
        })
    }

    /**
     * Generate the character's job, skills, and money based on the 
     * 'previously completed level'
     */
    generateJobSkillsMoney() {
        return new Promise((resolve, reject) => {
            let randomRole = Math.floor((Math.random() * 10) + 1)
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
        let finalIndex = 0

        try {
            for (let i = 0; i < percentArray.length; i++) {
                const element = percentArray[i];
                totalPercent += element["%"]
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
        return finalIndex
    }

    getAndAssignWeapons(filepath, precision, iterations) {
        return new Promise((resolve, reject) => {
            const weaponOptions = require(filepath)
            let weaponPercent = Math.floor((Math.random() * 10 ** (2 + precision)) + 1)
            if (!Object.is(NaN, iterations)) { //run multiple times
                //It's not pretty, but it works.
                let primaryWeaponIndex = this.getIndexByPercent(weaponOptions, weaponPercent)
                let primaryWeapon = Object.keys(weaponOptions)[primaryWeaponIndex]
                this.weaponList.push(primaryWeapon)
                ///console.log(primaryWeapon)

                weaponPercent = Math.floor((Math.random() * 10 ** (2 + precision)) + 1)

                primaryWeaponIndex = this.getIndexByPercent(weaponOptions, weaponPercent)
                primaryWeapon = Object.keys(weaponOptions)[primaryWeaponIndex]
                this.weaponList.push(primaryWeapon)
                //console.log(primaryWeapon)
            } else { //run once
                let primaryWeaponIndex = this.getIndexByPercent(weaponOptions, weaponPercent)
                let primaryWeapon = Object.values(weaponOptions)[primaryWeaponIndex]
                this.weaponList.push(primaryWeapon)
                //console.log(primaryWeapon)
            }
            resolve();
        })
    }

    assignWeapons() {
        return new Promise((resolve, reject) => {
            //grab the overall percents file
            const percents = require(this.filePath + 'percents.json')
            //Assign primary weapon time!
            const primaryPercents = Object.values(percents.primary)
            let primaryChooser = Math.floor((Math.random() * 100) + 1)

            let primaryDecisionIndex = this.getIndexByPercent(primaryPercents, primaryChooser)
            let filename = Object.keys(percents.primary)[primaryDecisionIndex]

            let timesToRun = parseInt(filename[0])
            if (!Object.is(NaN, timesToRun)) { //if this returns an int, the first char WAS  a number, thus we have to run that many times
                filename = filename.slice(1)
            }

            let primaryFilePath = this.filePath + filename
            let primaryPrecision = primaryPercents[primaryDecisionIndex]['precision']

            this.getAndAssignWeapons(primaryFilePath, primaryPrecision, timesToRun)

            //Assign secondary weapons now
            const secondaryPercents = Object.values(percents.secondary)
            let secondaryChooser = Math.floor((Math.random() * 100) + 1)

            let secondaryDecisionIndex = this.getIndexByPercent(secondaryPercents, secondaryChooser)
            filename = Object.keys(percents.secondary)[secondaryDecisionIndex]

            timesToRun = parseInt(filename[0])
            if (!Object.is(NaN, timesToRun)) { //if this returns an int, the first char WAS  a number, thus we only have to run that many times
                filename = filename.slice(1)
            }

            let secondaryFilePath = this.filePath + filename
            let secondaryPrecision = secondaryPercents[secondaryDecisionIndex]['precision']

            this.getAndAssignWeapons(secondaryFilePath, secondaryPrecision, timesToRun)
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
        return new Promise((resolve, reject) => {
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
                "________________________________________" //40*'_'
            console.log(this.weaponList)
            console.log(sheet)
        })
    }




}