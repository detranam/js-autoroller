module.exports = class CyberpunkOneShotCharacter {
    // Randomly assigns stats
    constructor(name, baseStats, recentlyFinishedLevel) {
        this.name = name;
        this.int = baseStats[0];
        this.ref = baseStats[1];
        this.tempref = baseStats[1];
        this.tech = baseStats[2];
        this.cool = baseStats[3];
        this.attr = baseStats[4];
        this.luck = baseStats[5];
        this.ma = baseStats[6];
        this.body = baseStats[7];
        this.emp = baseStats[8];
        this.tempemp = baseStats[8];
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
        this.money = 8000 + this.currentLevel * 2000;
        this.classSkillPoints = 40 + this.currentLevel * 5;
        this.standardSkillPoints = 20 + this.currentLevel * 3;
    }
    formatstat(stat) {
        return ('0' + stat).slice(-2)
    }
    printCharacterToTxt() {
        //According to research, simply doing '+' to concat strings is
        //the fastest way to create a large string. This means that I
        //will be individually building each character sheet line-by-line.
        //Print the header portion
        sheet = "============================================================" + //60*'='
            "[NAME: " + this.name + "] ROLE: [" + this.role + "]\n" +
            "============================================================" //60*'='
        //Print the first line of stats
        sheet += "|[COOL " + this.formatstat(this.cool) + "] [INT  " + this.formatstat(this.int) + "]" +
            "[TECH" + this.formatstat(this.tech) + "] [ATTR " + this.formatstat(this.attr) + "]|\n"
        //Print second line of stats
        sheet += "|[LUCK " + this.formatstat(this.luck) + "] [MA   " + this.formatstat(this.ma) + "]" +
            "[BODY " + this.formatstat(this.body) + "] [RUN  " + this.formatstat(this.run) + "]|\n"
        //Print the third line of stats
        sheet += "|[LEAP " + this.formatstat(this.leap) + "] [LIFT " + this.formatstat(this.lift) + "]" +
            "[REF |" + this.formatstat(this.tempref) + "/" + this.formatstat(this.ref) + "]       |\n" +
            //Print the final line of status
            "|          [EMP |" + this.formatstat(this.tempemp) + "/" + this.formatstat(this.emp) + "]                 |"
    }
}