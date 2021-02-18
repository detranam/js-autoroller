module.exports = class Die {
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