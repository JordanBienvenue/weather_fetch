//variable , constant , api
const api_key = "6e610778f53a309b5b7e2c664161d20f";

//get value from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const paramsCode = urlParams.get("code");
const paramsCity = urlParams.get("city");

// check Geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  countryElement.innerHTML = "<p> pena geolocation </p>";
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
