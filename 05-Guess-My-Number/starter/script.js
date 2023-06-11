'use strict';
const maxNumber = 20
let score = maxNumber
let answerNumber = 0
let highScore = 0


function evaluateGuess(number, guessNumber) {
    let result = 0;
    //0 for match
    //1 for too high
    //-1 for too low
    if (guessNumber == number) {
        return result
    } else if (guessNumber < number) {
        return -1
    } else {
        return 1
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initGame() {
    document.querySelector('.number').textContent = "?"
    document.querySelector('body').style.backgroundColor = "#222"
    document.querySelector('.message').textContent = "Input a number"
    score = maxNumber
    document.querySelector('.score').textContent = score



    answerNumber = getRandomInt(1, maxNumber)

}

const getGuess = function () {
    //Check if has failed
    if (score < 1) {
        document.querySelector('.message').textContent = "Already lose!!"
        return
    }

    let guessNumber = document.querySelector('.guess').value

    if (!guessNumber) {
        document.querySelector('.message').textContent = "Input a number!"
        return
    }
    let resultEvaluate = evaluateGuess(answerNumber, guessNumber)

    if (resultEvaluate == 0) {
        document.querySelector('.message').textContent = "Correct!"
        document.querySelector('body').style.backgroundColor = "#60b347"
        document.querySelector('.number').textContent = answerNumber

        if (score > highScore) {
            highScore = score
            document.querySelector('.highscore').textContent = highScore
        }
    } else if (resultEvaluate == -1) {
        document.querySelector('.message').textContent = "Too low!"
        score -= 1

    } else {
        document.querySelector('.message').textContent = "Too high!"
        score -= 1
    }

    document.querySelector('.score').textContent = score

    //For losing condition
    if (score == 0) {
        document.querySelector('.message').textContent = "You Lose"
    }
}

initGame()
document.querySelector('.check').addEventListener('click', getGuess)
document.querySelector('.again').addEventListener('click', initGame)

