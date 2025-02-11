const quiz = [
  {
    question: "What does HTML stand for ?",
    a: "Hyper Text Processor",
    b: "Hyper Text Markup Language",
    c: "Hyper Text Multiple Language",
    d: "Hyper Tool Multi Langauge",
    correct: "b",
  },
  {
    question: "What does CSS stand for ?",
    a: "Color Style Sheet",
    b: "Cascading Simple Sheet",
    c: "Color Simple Sheet",
    d: "Cascading Style Sheet",
    correct: "d",
  },
  {
    question: "Which HTML attribute is used to define inline styles ?",
    a: "Style",
    b: "Styles",
    c: "Font",
    d: "Class",
    correct: "a",
  },
  {
    question: "How do you insert a comment in a CSS file ?",
    a: "// this is a comment",
    b: "// this is a comment //",
    c: "/* this is a comment */",
    d: "/ this is a comment",
    correct: "c",
  },
  {
    question: "Bootstrap grid system is based on how many columns ?",
    a: "9",
    b: "3",
    c: "12",
    d: "6",
    correct: "c",
  },
];

let index = 0;
let right = 0,
  wrong = 0,
  na = 0;
let total = quiz.length;
let lineWidth = 20;

const queBox = document.querySelector(".body h5");
const optionInputs = document.querySelectorAll(".ans-div input");
const queCount = document.querySelector("#quesCount");
const timeLeft = document.querySelector("#timeLeft");
const line = document.querySelector("#line");
const nextBtn = document.querySelector(".footer button");

nextBtn.disabled = true;
optionInputs.forEach((e) => {
  e.addEventListener("click", () => {
    nextBtn.disabled = false;
  });
});

let time = timeLeft.innerText;
const timeOut = () => {
  const dec = () => {
    if (time > -1 && index != total) {
      time = time - 1;
      timeLeft.innerHTML = time;
      if (time == -1 && index != total) {
        na++;
        index++;
        loadQuestion();
      }
    }
  };
  if (time == 10) {
    setInterval(dec, 1000);
  }
};
timeOut();

const loadQuestion = () => {
  if (index === total) {
    return endQuiz();
  }
  line.style.width = `${lineWidth}%`;
  lineWidth += 20;
  reset();
  const data = quiz[index];
  queBox.innerText = `${index + 1}. ${data.question}`;
  queCount.innerText = index + 1;
  queCount.nextElementSibling.innerText = total;
  optionInputs[0].nextElementSibling.innerText = data.a;
  optionInputs[1].nextElementSibling.innerText = data.b;
  optionInputs[2].nextElementSibling.innerText = data.c;
  optionInputs[3].nextElementSibling.innerText = data.d;
};

const submitQuiz = () => {
  const data = quiz[index];
  const ans = getAns();
  setTimeout(() => {
    if (ans === data.correct) {
      right++;
    } else {
      wrong++;
    }
    index++;
    loadQuestion();
    return;
  }, 1000);
};

const getAns = () => {
  const data = quiz[index];
  let answer;
  optionInputs.forEach((input) => {
    if (input.checked) {
      answer = input.value;
      if (answer == data.correct) {
        input.parentElement.classList.add("right");
      } else {
        input.parentElement.classList.add("wrong");
      }
    }
  });
  return answer;
};

const reset = () => {
  nextBtn.disabled = true;
  optionInputs.forEach((input) => {
    input.checked = false;
    input.parentElement.classList.remove("wrong", "right");
  });
  timeLeft.innerHTML = 10;
  time = 10;
};

const rePlay = () => {
  location.reload();
};

const endQuiz = () => {
  document.querySelector(".box").innerHTML = `
        <div class="endQuiz p-4 d-flex flex-column justify-content-center align-items-center">
            <h3 class='pb-2'>Thanks For Playing Quiz</h3>
            <div class='w-100 d-flex justify-content-around'>
                <h2><i class="ri-checkbox-circle-fill"></i> : ${right}</h2>
                <h2><i class="ri-close-circle-fill"></i> : ${wrong}</h2>
                <h2><i class="ri-checkbox-blank-circle-fill"></i> : ${na}</h2>
            </div>
            <button onclick="rePlay()" class='btn btn-outline-primary mt-3'>Replay <i class="ri-repeat-line"></i></button>
        </div>
    `;
};

loadQuestion();
