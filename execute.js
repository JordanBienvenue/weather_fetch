const weather = {
  country: "Germany",
  city: "berlin",
  temp: 20,
  climate: "sunny",
};

// constant and var
const api_key = "6e610778f53a309b5b7e2c664161d20f";
const tempValue = document.querySelector(".temperature");
const countryElement = document.querySelector(".country");
const cityElement = document.querySelector(".city");
const climateElement = document.querySelector(".climate");
const latElement = document.querySelector(".lat");
const lonElement = document.querySelector(".lon");

// check Geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  countryElement.innerHTML = "<p> pena geolocation </p>";
}

// get value url params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const paramsCountry = urlParams.get("code");
const paramsCity = urlParams.get("city");
console.log(queryString);
console.log(paramsCountry);
console.log(paramsCity);

if (queryString === "?now" && !paramsCountry && !paramsCity) {
  function getWeather(lat, lon) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    console.log(api);

    fetch(api)
      .then(function (response) {
        let data = response.json();
        return data;
      })
      .then(function (data) {
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.temp = data.main.temp;
      })
      .then(function () {
        displayWeather();
      });
  }
} else if (paramsCountry || paramsCity) {
  // http://127.0.0.1:5500/?code=uk&city=london

  function getRegionWeather(paramsCountry, paramsCity) {
    let apiRegion = `http://api.openweathermap.org/data/2.5/weather?q=${paramsCity},${paramsCountry}&appid=${api_key}`;
    console.log(apiRegion);

    fetch(apiRegion)
      .then(function (response) {
        let data = response.json();
        return data;
      })
      .then(function (data) {
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.temp = data.main.temp;
      })
      .then(function () {
        displayWeather();
      });
  }
  getRegionWeather(paramsCountry, paramsCity);
} else {
  console.log("no data");
}

// set position

function setPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  getWeather(lat, lon);
  // display geolocation
  latElement.innerHTML = lat;
  lonElement.innerHTML = lon;
}

function showError() {
  countryElement.innerHTML = `<p> ${error.message}</p>`;
}

// display output
function displayWeather() {
  countryElement.innerHTML = `${weather.country}`;
  cityElement.innerHTML = `${weather.city}`;
  tempValue.innerHTML = `${weather.temp}`;
  climateElement.innerHTML = `${weather.climate}`;
}
