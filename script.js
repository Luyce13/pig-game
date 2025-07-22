"use strict";
const players = document.querySelectorAll(".player");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnReset = document.querySelector(".btn--new");
const scoresCurrent = document.querySelectorAll(".current-score");
const scoresTotal = document.querySelectorAll(".score");
const dice = document.querySelector(".dice");

function switchPlayer() {
    if (players[0].classList.contains("player--active")) {
        players[0].classList.remove("player--active");
        players[1].classList.add("player--active");
        playerActive = 2;
    } else {
        players[1].classList.remove("player--active");
        players[0].classList.add("player--active");
        playerActive = 1;
    }
}

function rollDice() {
    if (!gameOver) {
        const randomNumber = Math.trunc(Math.random() * 6 + 1);
        dice.setAttribute("src", `dice-${randomNumber}.png`);
        dice.classList.remove("hidden");
        if (randomNumber !== 1) {
            playerActive === 1
                ? scoreCurrentPlayer1 += randomNumber
                : scoreCurrentPlayer2 += randomNumber;
            updateCurrentScore(
                playerActive === 1 ? scoreCurrentPlayer1 : scoreCurrentPlayer2,
                playerActive,
            );
        } else {
            playerActive === 1
                ? scoreCurrentPlayer1 = 0
                : scoreCurrentPlayer2 = 0;
            updateCurrentScore(
                playerActive === 1 ? scoreCurrentPlayer1 : scoreCurrentPlayer2,
                playerActive,
            );
            switchPlayer();
        }
    }
}

function updateCurrentScore(n, p) {
    if (p === 1) {
        scoresCurrent[0].textContent = n;
    } else {
        scoresCurrent[1].textContent = n;
    }
}

function updateTotalScore(n, p) {
    if (p === 1) {
        // scoreCurrentPlayer1 = n;
        scoresTotal[0].textContent = n;
    } else {
        // scoreCurrentPlayer2 = n;
        scoresTotal[1].textContent = n;
    }
}

function holdScore() {
    if (playerActive === 1) {
        scoreTotalPlayer1 += scoreCurrentPlayer1;
        scoresTotal[0].textContent = scoreTotalPlayer1;
        scoreCurrentPlayer1 = 0;
        updateCurrentScore(0, 1);
        console.log(scoreTotalPlayer1, scoreTotalPlayer1 >= 100);
        if (scoreTotalPlayer1 >= 100) {
            players[0].classList.add("player--winner");
            players[0].classList.remove("player--active");
            gameOver = true;
        } else switchPlayer();
    } else {
        scoreTotalPlayer2 += scoreCurrentPlayer2;
        scoresTotal[1].textContent = scoreTotalPlayer2;
        scoreCurrentPlayer2 = 0;
        updateCurrentScore(0, 2);
        console.log(scoreTotalPlayer2, scoreTotalPlayer2 >= 100);
        if (scoreTotalPlayer2 >= 100) {
            players[1].classList.add("player--winner");
            players[1].classList.remove("player--active");
            gameOver = true;
        } else switchPlayer();
    }
}

function reset() {
    scoreCurrentPlayer1 = 0;
    scoreCurrentPlayer2 = 0;
    scoreTotalPlayer1 = 0;
    scoreTotalPlayer2 = 0;
    updateCurrentScore(0, 1);
    updateCurrentScore(0, 2);
    updateTotalScore(0, 1);
    updateTotalScore(0, 2);
    playerActive = 1;
    if (!players[0].classList.contains("player--active")) {
        players[0].classList.add("player--active");
        players[1].classList.remove("player--active");
    }
    players[0].classList.contains("player--winner")
        ? players[0].classList.remove("player--winner")
        : players[1].classList.remove("player--winner");
    dice.classList.add("hidden");
    gameOver = false;
}

let scoreTotalPlayer1 = 0;
let scoreTotalPlayer2 = 0;

let scoreCurrentPlayer1 = 0;
let scoreCurrentPlayer2 = 0;
let playerActive = 1;
let gameOver = false;

btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdScore);

btnReset.addEventListener("click", reset);
