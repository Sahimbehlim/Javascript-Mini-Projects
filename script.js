const projectsWrapper = document.querySelector(".projects-wrapper");

const sortedProjects = projects.sort((a, b) => {
  return a.name.localeCompare(b.name);
});

const projectHTML = sortedProjects
  .map(
    (project, index) =>
      `
    <a id="${index + 1}" href="${project.link}" class="text-decoration-none">
    <div class="border flex flex-col items-center justify-center gap-1 border-white p-4 rounded-md w-full h-full">
      <h2 class="text-5xl font-bold">${index < 9 ? "0" : ""}${index + 1}</h2>
      <h2 class="text-3xl text-center">${project.name}</h2>
    </div>
    </a>
  `
  )
  .join("");

projectsWrapper.innerHTML = projectHTML;
