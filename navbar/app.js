const links = document.querySelector(".links");
const toggleBtn = document.querySelector(".nav-toggle");

toggleBtn.addEventListener("click", () => {
  links.classList.toggle("show-links");
});
