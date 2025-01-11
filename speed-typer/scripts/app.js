const wordElement = document.getElementById("word"),
  wordInput = document.getElementById("word-input"),
  currentScoreElement = document.getElementById("current-score"),
  timeLeftElement = document.getElementById("time-left"),
  finalScoreElement = document.getElementById("final-score"),
  playAgainBtn = document.getElementById("play-again-btn"),
  gameWrapper = document.querySelector(".game-wrapper"),
  resultWrapper = document.querySelector(".result-wrapper");

let score = 0;
let timerInterval;
let timeRemaining = 5;

// Generate a random word from the list
const generateRandomWord = () => {
  wordElement.textContent = words[Math.floor(Math.random() * words.length)];
};

// Update the timer display and handle the countdown
const startTimer = (seconds = 5) => {
  clearInterval(timerInterval);
  timeRemaining = seconds;

  timerInterval = setInterval(() => {
    timeLeftElement.textContent = timeRemaining;
    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
};

// Reset game state for a new round
const resetGame = () => {
  score = 0;
  currentScoreElement.textContent = score;
  timeLeftElement.textContent = "*";
  wordInput.value = "";
};

// Check if the entered word matches the displayed word
const checkWord = () => {
  const inputVal = wordInput.value.trim().toLowerCase();

  if (inputVal === wordElement.textContent) {
    generateRandomWord();
    wordInput.value = "";
    score++;
    currentScoreElement.textContent = score;
    startTimer();
  }
};

// End the game and display the results
const endGame = () => {
  finalScoreElement.textContent = score;
  gameWrapper.classList.replace("d-flex", "d-none");
  resultWrapper.classList.replace("d-none", "d-flex");
  resetGame();
};

// Start a new game
const playAgain = () => {
  resetGame();
  gameWrapper.classList.replace("d-none", "d-flex");
  resultWrapper.classList.replace("d-flex", "d-none");
  generateRandomWord();
  wordInput.focus();
  startTimer();
};

// Event Listeners
playAgainBtn.addEventListener("click", playAgain);
window.addEventListener("keyup", checkWord);
document.addEventListener("DOMContentLoaded", () => {
  generateRandomWord();
  startTimer();
  wordInput.focus();
});
