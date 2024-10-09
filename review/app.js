const reviews = [
  {
    id: 1,
    name: "sara jones",
    job: "web developer",
    img: "https://images.pexels.com/photos/977796/pexels-photo-977796.jpeg?auto=compress&cs=tinysrgb&w=600",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto asperiores debitis incidunt, eius earum ipsam cupiditate libero? Iste, doloremque nihil?",
  },
  {
    id: 2,
    name: "anna johnson",
    job: "web designer",
    img: "https://images.pexels.com/photos/1553783/pexels-photo-1553783.jpeg?auto=compress&cs=tinysrgb&w=600",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosa tenetur unde recusandae nobis voluptas mollitia architecto omnis an atque quam.",
  },
  {
    id: 3,
    name: "peter jones",
    job: "intern",
    img: "https://www.course-api.com/images/people/person-4.jpeg",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium recusandae veniam eveniet, corrupti saepe suscipit molestias officiis nisi nostrum ducimus, ex impedit reiciendis a sequi.",
  },
  {
    id: 4,
    name: "bill anderson",
    job: "the boss",
    img: "https://www.course-api.com/images/people/person-3.jpeg",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam repellendus debitis dignissimos porro soluta quidem dolorum harum non beatae repellat qui velit totam, alias perferendis corporis tempora quasi error ex.",
  },
];

const personImg = document.querySelector("#person-img"),
  author = document.querySelector("#author"),
  job = document.querySelector("#job"),
  info = document.querySelector("#info"),
  buttons = document.querySelectorAll("button");

let index = 0;

const loadData = () => {
  const currentData = reviews[index];
  personImg.src = currentData.img;
  author.textContent = currentData.name;
  job.textContent = currentData.job;
  info.textContent = currentData.text;
};

window.addEventListener("DOMContentLoaded", loadData());

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const nextBtn = e.currentTarget.classList.contains("next-btn");
    const prevBtn = e.currentTarget.classList.contains("prev-btn");
    if (nextBtn) {
      index++;
      if (index === reviews.length) {
        index = 0;
      }
      loadData();
    } else if (prevBtn) {
      index--;
      if (index < 0) {
        index = reviews.length - 1;
      }
      loadData();
    } else {
      index = Math.floor(Math.random() * reviews.length);
      loadData();
    }
  });
});
