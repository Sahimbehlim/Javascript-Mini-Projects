const inputArea = document.querySelector("textarea"),
  wordCount = document.getElementById("word-count"),
  charachterCount = document.getElementById("character-count");

inputArea.focus();
inputArea.addEventListener("keyup", () => {
  charachterCount.textContent = inputArea.value.length;
  let txt = inputArea.value.trim();
  wordCount.textContent = txt.split(/\s+/).filter((item) => item).length;
});
