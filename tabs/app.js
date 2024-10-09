const tabBtns = document.querySelectorAll(".tab-btn");
const contentBoxes = document.querySelectorAll(".content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tabBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    const btnId = e.currentTarget.dataset.id;
    contentBoxes.forEach((box) => {
      box.classList.remove("active");
      if (btnId === box.getAttribute("id")) {
        box.classList.add("active");
      }
    });
  });
});
