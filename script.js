"use strict";
const playerEls = document.querySelectorAll(".player");
const currentEls = document.querySelectorAll(".current-score");
const scoreEls = document.querySelectorAll(".score");
const diceEl = document.querySelector(".dice");
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");

let scores = [0, 0];
let current = 0;
let playerActive = 0;
let gameOver = false;

const switchPlayer = function () {
    currentEls[playerActive].textContent = 0;
    playerEls.forEach((player) => player.classList.toggle("player--active"));
    current = 0;
    playerActive === 0 ? (playerActive = 1) : (playerActive = 0);
};

diceEl.classList.add("hidden");
scoreEls.forEach((el) => (el.textContent = 0));
currentEls.forEach((el) => (el.textContent = 0));

btnRollEl.addEventListener("click", function () {
    if (!gameOver) {
        const diceValue = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${diceValue}.png`;
        if (diceValue !== 1) {
            current += diceValue;
            currentEls[playerActive].textContent = current;
        } else switchPlayer();
    }
});

btnHoldEl.addEventListener("click", function () {
    if (!gameOver) {
        scores[playerActive] += current;
        scoreEls[playerActive].textContent = scores[playerActive];
        if (scores[playerActive] >= 100) {
            gameOver = true;
            current = 0;
            currentEls[playerActive].textContent = 0;
            playerEls[playerActive].classList.add("player--winner");
            playerEls[playerActive].classList.remove("player--active");
        } else switchPlayer();
    }
});

btnNewEl.addEventListener("click", function () {
    playerEls[playerActive].classList.remove("player--winner");
    playerActive = 0;
    playerEls[playerActive].classList.add("player--active");
    scoreEls.forEach((score) => (score.textContent = 0));
    diceEl.classList.add("hidden");
    scores = [0, 0];
    gameOver = false;
});
