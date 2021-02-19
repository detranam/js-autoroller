/**
 * Creates a Die to include various rolling capabilities
 */
module.exports = class Die {
    /**
     * Creates a die with a given amount of sides
     * @param {Number} sides the (integer) number of sides this die will have and use
     */
    constructor(sides) {
        this.sides = parseInt(sides) //ensure 'sides' is an int
    }
    /**
     * Rolls the die and returns its' value
     */
    roll() {
        return Math.floor((Math.random() * this.sides) + 1)
    }
    /**
     * Rolls the die twice and returns the higher value
     */
    rollTwoDropLowest() {
        var firstRoll = Math.floor((Math.random() * this.sides) + 1)
        var secondRoll = Math.floor((Math.random() * this.sides) + 1)
        return firstRoll > secondRoll ? firstRoll : secondRoll
    }
}