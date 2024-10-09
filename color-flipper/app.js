const btn = document.querySelector("button"),
  color = document.querySelector(".color");

const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

btn.addEventListener("click", () => {
  let hexColor = "#";
  for (let index = 0; index < 6; index++) {
    hexColor += hex[Math.floor(Math.random() * hex.length)];
  }
  document.body.style.background = hexColor;
  color.textContent = hexColor;
});
