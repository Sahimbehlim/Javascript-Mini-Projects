const btns = document.querySelectorAll(".btn"),
  value = document.querySelector("#value");

let count = 0;
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("increase")) {
      count++;
    } else if (e.currentTarget.classList.contains("decrease")) {
      count--;
    } else {
      count = 0;
    }

    value.textContent = count;
    count < 0
      ? (value.style.color = "red")
      : (value.style.color = "hsl(209, 61%, 16%)");
  });
});
