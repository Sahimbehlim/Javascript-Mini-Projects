const addFlashcardBtn = document.querySelector(".add-flashcard"),
  addFlashcardContainer = document.querySelector(".add-flashcard-container"),
  closeIcon = document.querySelector(".ri-close-large-line"),
  saveFlashCardBtn = document.querySelector(".add-flashcard-container button"),
  question = document.querySelector("#question"),
  answer = document.querySelector("#answer"),
  flashCardWrapper = document.querySelector(".flashcard-wrapper"),
  categorySelect = document.querySelector("#category-select");

let editable = false;
let currentFlashCard = null;

// Show flashcard container
const showFlashcardContainer = (
  edit = false,
  questionVal = "",
  answerVal = "",
  categoryVal = "GK"
) => {
  addFlashcardContainer.querySelector("h4").textContent = edit
    ? "Edit Flashcard"
    : "Save Flashcard";
  saveFlashCardBtn.textContent = edit ? "Apply Changes" : "Save";
  editable = edit;

  // Reset fields if adding a new flashcard
  question.value = questionVal;
  answer.value = answerVal;
  categorySelect.value = categoryVal;

  addFlashcardContainer.style.display = "flex";
  document.body.style.overflowY = "hidden";
  question.focus();
};

// Hide the flashcard container
const hideFlashcardContainer = () => {
  addFlashcardContainer.style.display = "none";
  document.body.style.overflowY = "auto";
};

// Flashcard category styles
const flashcardStyles = (category) =>
  ({
    GK: "gk",
    Science: "science",
    History: "history",
  }[category] || "undefined");

// Flashcard HTML structure generator
const flashCardGenerator = (questionText, answerText, categoryText) => {
  const bgClass = flashcardStyles(categoryText);
  return `<div
              class="d-flex flex-column gap-1 flashcard-box ${bgClass} p-3 rounded-2"
            >
              <h5 class="fw-medium que-text m-0 pb-2">${questionText}</h5>
              <p class="m-0 pb-1 fw-medium text-secondary-emphasis ans-text">${answerText}</p>
              <div class="d-flex flex-column mt-auto">
                <button class="btn btn-dark show-hide-btn">Show</button>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <p class="category-text">${categoryText}</p>
                  <div class="d-flex gap-2">
                    <i class="ri-edit-box-line text-primary"></i>
                    <i class="ri-delete-bin-line text-danger"></i>
                  </div>
                </div>
              </div>
          </div>`;
};

// Create a new flashcard
const createFlashCard = () => {
  flashCardWrapper.insertAdjacentHTML(
    "beforeend",
    flashCardGenerator(question.value, answer.value, categorySelect.value)
  );
  saveDataToLocalStorage();
};

// Edit an existing flashcard
const editFlashCard = () => {
  if (currentFlashCard) {
    const questionText = currentFlashCard.querySelector(".que-text");
    const answerText = currentFlashCard.querySelector(".ans-text");
    const categoryText = currentFlashCard.querySelector(".category-text");

    questionText.textContent = question.value;
    answerText.textContent = answer.value;
    categoryText.textContent = categorySelect.value;

    const bgClass = flashcardStyles(categorySelect.value);
    if (!currentFlashCard.classList.contains(bgClass)) {
      currentFlashCard.classList.remove(
        "gk",
        "science",
        "history",
        "undefined"
      );
      currentFlashCard.classList.add(bgClass);
    }
  }
  saveDataToLocalStorage();
  hideFlashcardContainer();
};

// Event listeners
addFlashcardBtn.addEventListener("click", () => showFlashcardContainer(false));

closeIcon.addEventListener("click", hideFlashcardContainer);

saveFlashCardBtn.addEventListener("click", () => {
  if (!question.value || !answer.value) {
    return alert("All fields is required");
  }

  editable ? editFlashCard() : createFlashCard();
  hideFlashcardContainer();
});

flashCardWrapper.addEventListener("click", (e) => {
  const currentBox = e.target.closest(".flashcard-box");
  const currentQueText = currentBox?.querySelector(".que-text");
  const currentAnsText = currentBox.querySelector(".ans-text");
  const currentCategoryText = currentBox.querySelector(".category-text");

  if (e.target.classList.contains("show-hide-btn")) {
    currentAnsText.classList.toggle("show");
    e.target.textContent = currentAnsText.classList.contains("show")
      ? "Hide"
      : "Show";
  }
  if (e.target.classList.contains("ri-delete-bin-line")) {
    currentBox.remove();
    saveDataToLocalStorage();
  }
  if (e.target.classList.contains("ri-edit-box-line")) {
    currentFlashCard = currentBox;
    showFlashcardContainer(
      true,
      currentQueText.textContent,
      currentAnsText.textContent,
      currentCategoryText.textContent
    );
  }
});

// Save flashcards to localStorage
const saveDataToLocalStorage = () => {
  const flashcards = Array.from(
    flashCardWrapper.querySelectorAll(".flashcard-box")
  ).map((box) => ({
    queText: box.querySelector(".que-text").textContent,
    ansText: box.querySelector(".ans-text").textContent,
    categoryText: box.querySelector(".category-text").textContent,
  }));
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
};

// Load flashcards from localStorage
const loadDataFromLocalStorage = () => {
  const storedFlashCards = JSON.parse(localStorage.getItem("flashcards")) || [];
  storedFlashCards.forEach(({ queText, ansText, categoryText }) => {
    flashCardWrapper.insertAdjacentHTML(
      "beforeend",
      flashCardGenerator(queText, ansText, categoryText)
    );
  });
};

// Load flashcards on page loads
window.addEventListener("DOMContentLoaded", loadDataFromLocalStorage);
