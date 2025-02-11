// Select DOM elements
const searchBtn = document.querySelector(".search-btn");
const currentLocationBtn = document.querySelector(".current-location-btn");
const cityInput = document.querySelector(".city-input");
const weatherCards = document.querySelector(".weather-cards");
const todayWeatherCard = document.querySelector(".today-weather-card");

// Store API key
const APIKEY = "c56c19f1c7c38425e05537cb48d74e41";

// Function to create a weather card
const createWeatherCard = (cityName, weatherData, index) => {
  const tempCelsius = (weatherData.main.temp - 273.15).toFixed(2);
  const date = weatherData.dt_txt.split(" ")[0];
  const iconURL = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
  const description = weatherData.weather[0].description;

  if (index === 0) {
    return `<div class="d-flex flex-column gap-2">
              <p class="fs-3 fw-semibold">
              ${cityName} (${date})
              </p>
              <p>Temperature: ${tempCelsius}°C</p>
              <p>Wind: ${weatherData.wind.speed} M/S</p>
              <p>Humidity: ${weatherData.main.humidity}%</p>
            </div>
            <div class="text-center icon-box">
              <img src="${iconURL}" alt="weather-conditions"/>
              <p>${description}</p>
            </div>`;
  } else {
    return `<div class="bg-secondary p-3 rounded-2 flex-grow-1 d-flex flex-column gap-1 weather-sub-card">
              <p>(${date})</p>
              <img src="${iconURL.replace(
                "@4x",
                "@2x"
              )}" alt="weather-conditions"/>
              <p>Temp: ${tempCelsius}°C</p>
              <p>Wind: ${weatherData.wind.speed} M/S</p>
              <p">Humidity: ${weatherData.main.humidity}%</p>
          </div>`;
  }
};

// General function to fetch weather data
const fetchWeatherData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching weather data.");
  }
};

// Function to get weather information using city coordinates
const getWeatherInfo = async (cityName, lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
  const data = await fetchWeatherData(WEATHER_API_URL);

  if (data) {
    const uniqueDays = new Set();
    const fiveDaysForecast = data.list.filter((forecast) => {
      const forecastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqueDays.has(forecastDate)) {
        uniqueDays.add(forecastDate);
        return true;
      }
      return false;
    });

    cityInput.value = "";
    todayWeatherCard.innerHTML = "";
    weatherCards.innerHTML = "";

    // Use a DocumentFragment to batch DOM updates
    const todayCard = createWeatherCard(cityName, fiveDaysForecast[0], 0);
    todayWeatherCard.insertAdjacentHTML("beforeend", todayCard);

    fiveDaysForecast.slice(1).forEach((weatherData, index) => {
      weatherCards.insertAdjacentHTML(
        "beforeend",
        createWeatherCard(cityName, weatherData, index + 1)
      );
    });
  }
};

// Function to get city coordinates based on user input
const getCityCoordinates = async () => {
  const cityName = cityInput.value.trim();
  if (!cityName) return alert("Input can't be empty !");

  const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIKEY}`;
  const data = await fetchWeatherData(GEOCODING_API_URL);

  if (data && data.length > 0) {
    const { name, lat, lon } = data[0];
    getWeatherInfo(name, lat, lon);
  } else {
    alert(`No coordinates found for ${cityName}`);
  }
};

// Function to get user coordinates and fetch weather data
const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${APIKEY}`;
      const data = await fetchWeatherData(REVERSE_GEOCODING_URL);

      if (data && data.length > 0) {
        const { name } = data[0];
        getWeatherInfo(name, latitude, longitude);
      } else {
        alert("Could not determine city from your location.");
      }
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert("Permission denied to access location.");
      }
    }
  );
};

// Event listeners
currentLocationBtn.addEventListener("click", getUserCoordinates);
searchBtn.addEventListener("click", getCityCoordinates);
cityInput.addEventListener(
  "keyup",
  (e) => e.key === "Enter" && getCityCoordinates()
);
