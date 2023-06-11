'use strict';

const playerScores = document.querySelectorAll('.score')
const playerCurrentScores = document.querySelectorAll('.current-score')
let currentNumber = 0

let currentPlayer = 0
let nextPlayer = 1

let player1 = {
    "score": 0,
    "current": 0
}

let player2 = {
    "score": 0,
    "current": 0
}

let players = {
    "0": player1,
    "1": player2
}

function restartGame() {
    //Reset score
    for (const s of playerScores) {
        s.textContent = 0
    }

    //Reset current score
    for (const cs of playerCurrentScores) {
        cs.textContent = 0
    }

    document.querySelector(".dice").classList.add("hidden")
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollDice() {
    if (document.querySelector(".dice").classList.contains("hidden")) {
        document.querySelector(".dice").classList.remove("hidden")

    }

    currentNumber = getRandomInt(1, 6)

    //Change image dice
    document.querySelector(".dice").src = `dice-${currentNumber}.png`

    if (currentNumber != 1) {
        players[currentPlayer].current += currentNumber
        document.getElementById(`current--${currentPlayer}`).textContent = players[currentPlayer].current

    } else {
        players[currentPlayer].current = 0
        hold()
    }




}

function hold() {
    players[currentPlayer].score += players[currentPlayer].current
    players[currentPlayer].current = 0
    document.getElementById(`score--${currentPlayer}`).textContent = players[currentPlayer].score
    document.getElementById(`current--${currentPlayer}`).textContent = 0

    changePlayer()
}

function changePlayer() {
    document.querySelector(`.player--${currentPlayer}`).classList.remove("player--active")
    if (currentPlayer == 0) {
        currentPlayer = 1
    } else {
        currentPlayer = 0
    }
    document.querySelector(`.player--${currentPlayer}`).classList.add("player--active")
}

//Component
const btnRestart = document.querySelector('.btn--new')
btnRestart.addEventListener('click', restartGame)

const btnRollDice = document.querySelector('.btn--roll')
btnRollDice.addEventListener('click', rollDice)

const btnHold = document.querySelector('.btn--hold')
btnHold.addEventListener('click', hold)


restartGame()