const questions = document.querySelectorAll(".question");

questions.forEach((question) => {
  const btn = question.querySelector(".question-btn");
  btn.addEventListener("click", () => {
    questions.forEach((item) => {
      item !== question
        ? item.classList.remove("show-text")
        : question.classList.toggle("show-text");
    });
  });
});
