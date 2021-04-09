import "./style.scss";

let loc = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
const searchImput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchImput.value);
  searchImput.value = "";
});

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=07dd5cc14ab786daf9016aba357c307f`,

      { mode: "cors" }
    );

    const weatherData = await response.json();
    console.log(weatherData);
    const { name } = weatherData;
    const { feels_like } = weatherData.main;
    const { id, main } = weatherData.weather[0];
    loc.textContent = name;
    climate.textContent = main;
    tempValue.textContent = Math.round(feels_like - 273);
    if (id < 300 && id > 200) {
      tempIcon.src = "../src/animated/thunder.svg";
    } else if (id < 400 && id > 300) {
      tempIcon.src = "../src/animated/rainy-2.svg";
    } else if (id < 600 && id > 500) {
      tempIcon.src = "../src/animated/rainy-7.svg";
    } else if (id < 700 && id > 600) {
      tempIcon.src = "../src/animated/snowy-6.svg";
    } else if (id < 800 && id > 700) {
      tempIcon.src = "../src/animated/cloudy.svg";
    } else if (id < 900 && id > 800) {
      tempIcon.src = "../src/animated/day.svg";
    }
  } catch (error) {
    alert("city not found");
  }
};

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";

      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=07dd5cc14ab786daf9016aba357c307f`;

      fetch(api)
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          const { name } = data;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];

          loc.textContent = name;
          climate.textContent = main;
          tempValue.textContent = Math.round(feels_like - 273);
          if (id < 300 && id > 200) {
            tempIcon.src = "../src/animated/thunder.svg";
          } else if (id < 400 && id > 300) {
            tempIcon.src = "../src/animated/rainy-2.svg";
          } else if (id < 600 && id > 500) {
            tempIcon.src = "../src/animated/rainy-7.svg";
          } else if (id < 700 && id > 600) {
            tempIcon.src = "../src/animated/snowy-6.svg";
          } else if (id < 800 && id > 700) {
            tempIcon.src = "../src/animated/cloudy.svg";
          } else if (id < 900 && id > 800) {
            tempIcon.src = "../src/animated/day.svg";
          }

          console.log(data);
        });
    });
  }
});
