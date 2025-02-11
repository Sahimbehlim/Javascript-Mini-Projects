// Cache DOM elements for performance and ease of use
const loadBox = document.querySelector(".load-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const question = document.querySelector(".question-div h5");
const timeLeft = document.querySelector(".timer");
const options = document.querySelectorAll(".option");
const nextBtn = document.querySelector(".next-btn");

// Initialize variables to track quiz state
let index = 0,
  right = 0,
  wrong = 0,
  highestScore = 0,
  duration = 30,
  timerInterval;

// Function to set up the initial loading screen and event listeners
const loadBoxLoader = () => {
  loadBox.innerHTML = `
            <img src="quiz-time.png" alt="" />
            <button class="btn btn-success fw-semibol">Start Now >>></button>
            <p class="pt-3 fw-semibold ${
              highestScore > 0 ? "d-block" : "d-none"
            }">Highest Score : ${highestScore}/${questions.length}</p>
          `;

  // Add event listener to the start button
  loadBox.querySelector("button").addEventListener("click", startQuiz);
};

// Function to start the quiz, reset scores, and load the first question
const startQuiz = () => {
  index = 0;
  right = 0;
  wrong = 0;
  loadQuestion();
  startCountdown();
  loadBox.classList.add("d-none");
  quizBox.classList.remove("d-none");
};

// Function to handle the countdown timer for each question
const startCountdown = () => {
  // Update styles based on the remaining time
  const styleHandler = () => {
    if (duration == 15) {
      document.body.style.backgroundColor = "#D4D69F8C";
      timeLeft.style.backgroundColor = "#C5B1006E";
      nextBtn.classList.replace("btn-success", "btn-warning");
    }
    if (duration == 5) {
      document.body.style.backgroundColor = "#DBADAD";
      timeLeft.style.backgroundColor = "#C50C006E";
      nextBtn.classList.replace("btn-warning", "btn-danger");
    }
  };

  // Decrement duration and check for time out
  const timeHandler = () => {
    if (duration >= 0 && index < questions.length) {
      duration--;
      timeLeft.innerHTML = `00 : ${duration < 10 ? "0" : ""}${duration}`;
      styleHandler();

      if (duration === 0) {
        clearInterval(timerInterval);
        wrong++;
        index++;
        if (index < questions.length) {
          loadQuestion();
          startCountdown();
        } else {
          endQuiz();
        }
      }
    }
  };

  // Clear any existing intervals and start a new countdown
  clearInterval(timerInterval);
  timerInterval = setInterval(timeHandler, 1000);
};

// Function to load a question and set up options
const loadQuestion = () => {
  reset(); // Reset the state for the new question
  const data = questions[index];
  question.textContent = data.question;
  timeLeft.textContent = `00 : ${duration < 10 ? "0" : ""}${duration}`;
  timeLeft.style.backgroundColor = "#198754";
  nextBtn.classList.add("btn-success");

  // Set up the options for the current question
  options.forEach((option, i) => {
    const [radio, label] = option.children;
    label.textContent = data.options[i];
    radio.value = data.options[i];
  });

  // Add click event listeners to each option
  options.forEach((option) => {
    option.addEventListener("click", () => {
      handleOptionClick(option);
    });
  });
};

// Function to handle option clicks and update the UI
const handleOptionClick = (clickedOption) => {
  // Remove 'clicked' class from all options
  options.forEach((option) => option.classList.remove("clicked"));

  // Mark the clicked option and enable the next button
  const targetId = clickedOption.getAttribute("data-target");
  const radioButton = document.getElementById(targetId);
  if (radioButton) radioButton.checked = true;
  clickedOption.classList.add("clicked");
  nextBtn.disabled = false;
};

// Function to handle quiz submission
const submitQuiz = () => {
  // Disable all options after submission
  options.forEach((option) => option.classList.add("disabled"));
  getAns(); // Check the selected answers
  setTimeout(() => {
    index++;
    if (index < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }, 1500); // Wait for a short time before loading the next question or ending the quiz
};

// Function to check the selected answers and update scores
const getAns = () => {
  options.forEach((option) => {
    const radio = option.children[0];
    const selectedOption = radio.value;
    const isChecked = radio.checked;
    const isCorrect = selectedOption === questions[index].answer;

    if (isChecked) {
      option.classList.add(isCorrect ? "correct" : "wrong");
      if (!isCorrect) wrong++;
      if (isCorrect) right++;
    }

    if (!isCorrect) {
      options.forEach((opt) => {
        if (opt.children[0].value === questions[index].answer) {
          opt.classList.add("correct");
        }
      });
    }
  });
};

// Function to reset the quiz state for a new question
const reset = () => {
  duration = 30;
  document.body.style.backgroundColor = "#CCE2C2";
  nextBtn.classList.remove("btn-danger", "btn-warning");
  nextBtn.disabled = true;
  options.forEach((option) => {
    option.classList.remove("clicked", "correct", "wrong", "disabled");
    option.children[0].checked = false;
  });
};

// Function to display the final result and update the highest score
const endQuiz = () => {
  quizBox.classList.add("d-none");
  resultBox.classList.remove("d-none");
  document.body.style.backgroundColor = "#F6F4F0";

  highestScore = Math.max(highestScore, right);

  const rightPercentage = (right / questions.length) * 100;
  const wrongPercentage = (wrong / questions.length) * 100;

  resultBox.innerHTML = `
            <div class="d-flex flex-column align-items-center">
              <img src="quiz-time.png" alt="" />
              <h5 class="fw-bold">Result</h5>
            </div>

            <div class="d-flex flex-column gap-2 w-100 fw-semibold">
              <div class="text-white overflow-hidden rounded-3 d-flex">
                <div style="width: ${rightPercentage}%; display: 
                  ${
                    rightPercentage === 0 ? "none" : "block"
                  }" class="right-ans-progress bg-success p-3">
                  ${rightPercentage.toFixed(0)}%
                </div>

                <div style="width: ${wrongPercentage}%; display :
                  ${
                    wrongPercentage === 0 ? "none" : "block"
                  }" class="wrong-ans-progress bg-danger p-3">
                  ${wrongPercentage.toFixed(0)}%
                </div>
              </div>
              <p class="text-center">${right}/${questions.length}</p>
            </div>
            
            <div class="d-flex flex-column align-items-center gap-2">
              <h5 class="fw-bold text-center">"Keep learning, you have a ${
                rightPercentage >= wrongPercentage ? "good" : "bad"
              } score!"</h5>
              <button onclick="retry()" class="btn btn-success">Retry</button>
            </div>`;
};

// Function to restart the quiz
const retry = () => {
  resultBox.classList.add("d-none");
  loadBox.classList.remove("d-none");
  loadBoxLoader();
};

// Initialize the quiz when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadBoxLoader);

// Add event listener to the next button
nextBtn.addEventListener("click", submitQuiz);
