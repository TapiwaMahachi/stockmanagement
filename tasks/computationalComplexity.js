
/**
 * Time Complexity
 * 
 * This algorithm has a big O(n)
 * this algorithm  performance will grow linearly and in direct proportion to the size of the inputString.
 * if the string is of length 5 it will run 5 times if it is of length 20 it will run 20 times.
 * As you an see the time complexity increases as the size increase and it increases at the same rate.
 * The reason is because theres only one loop that will run for each character.
 *
 *
 *  Space Complexity
 * 
 * The required memory for the doBracketsMatch function would be
 * detemined by the length of the inputString. the other functions have fixed memory space allocated
 * as well as the all the variables and return statements. Only the inputString changes memory
 * size allocation as we dont know its actual length.
 * We can evaluate the space complexity of the doBracketsMatch  function as linear or O(n).
 * 
*/


function BracketStack () {
    let openBracketsCount = 0
    this.isEmpty = function () {
    return openBracketsCount === 0
    }
    this.push = function () {
    openBracketsCount++
    }
/**
* @throws If stack is empty
*/
    this.pop = function () {
    if ( this.isEmpty()) throw new Error ( "Cannot pop empty stack" )
    openBracketsCount--
    }
}
/**
* @param {string} symbol
* @returns A function that checks if a given value is the symbol
*/
function isSymbol (symbol) {
/**
* @param {string} value
* @returns {boolean}
*/
 return function check (value) {
  return symbol === value
  }
 
}
/**
* Checks if a pair of brackets match
* @param {string} inputString
* @param {string} openingSymbol
* @param {string} closingSymbol
*/
function doBracketsMatch (inputString, openingSymbol, closingSymbol) {
    let stack = new BracketStack()
    let isOpeningSymbol = isSymbol(openingSymbol)
    let isClosingSymbol = isSymbol(closingSymbol)
    for ( let i = 0 ; i < inputString.length; i++) {
    let value = inputString[i]
        if (isOpeningSymbol(value)) stack.push()
        if (isClosingSymbol(value))
        if (stack.isEmpty()) return false
        else stack.pop()
    }
    return stack.isEmpty()
}

doBracketsMatch("((()","(",")");

