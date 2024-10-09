const API_KEY = process.env.WEATHER_API_KEY;

const searchBar = document.querySelector(".header input");
const searchBtn = document.querySelector(".search-icon-box");
const weatherBody = document.querySelector(".body");
const weatherFooter = document.querySelector(".footer");

searchBar.focus();

console.log(API_KEY);

// Checking weather functionality
const checkWeather = async (city) => {
  // Fetching data
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c56c19f1c7c38425e05537cb48d74e41&units=metric`
  );

  if (response.status == 404) {
    alert("Invalid City Name!");
  } else {
    let data = await response.json();

    const weatherState = data.weather[0].main.toLowerCase();

    // Updating weather body as per city
    weatherBody.classList.add("my-4");
    weatherBody.innerHTML = `
                <img src="images/${weatherState}.png" alt="">
                <div class="pt-3">
                    <h1 class="temp">${Math.round(data.main.temp)}°c</h1>
                    <h2>${data.name}</h2>
                </div>
        `;

    // Updating weather footer as per city
    weatherFooter.classList.add("pt-3", "pt-sm-4");
    weatherFooter.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="images/humidity.png" alt="">
                <div class="ps-2">
                    <h4>${data.main.humidity}%</h4>
                    <p>Humidity</p>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <img src="images/wind.png" alt="">
                <div class="ps-2">
                    <h4>${data.wind.speed} km/h</h4>
                    <p>Wind Speed</p>
                </div>
            </div>
        `;
  }
  searchBar.value = "";
};

// Search for weather info on button click
searchBtn.addEventListener("click", () => {
  if (searchBar.value == "") {
    alert("Input Can't Be Empty!");
  } else {
    checkWeather(searchBar.value);
  }
  searchBar.focus();
});
