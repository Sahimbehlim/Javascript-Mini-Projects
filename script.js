const projectsWrapper = document.querySelector(".projects-wrapper");

const sortedProjects = projects.sort((a, b) => {
  return a.name.localeCompare(b.name);
});

const projectHTML = sortedProjects
  .map(
    (project, index) =>
      `<div id="${
        index + 1
      }" class="border flex flex-col items-center justify-center gap-1 border-white p-4 rounded-md w-100">
    <h2 class="text-5xl font-bold">${index < 9 ? "0" : ""}${index + 1}</h2>
    <div class="flex items-center gap-3">
      <h2 class="text-3xl w-max">${project.name}</h2>
      <a
        href="${project.link}"
        class="text-2xl border border-white h-8 w-8 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
      >
        <i class="ri-arrow-right-up-line"></i>
      </a>
    </div>
  </div>`
  )
  .join("");

projectsWrapper.innerHTML = projectHTML;
