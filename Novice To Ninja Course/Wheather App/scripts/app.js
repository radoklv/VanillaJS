const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const icon = document.querySelector(".icon");
const time = document.querySelector(".time");

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

const updateUi = (data) => {
  const cityDets = data.cityDets;
  const weather = data.weather;

  //Change day/night picture
  const timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  //Change weather icon
  icon.innerHTML = `<img src="img/icons/${weather.WeatherIcon}.svg">`;

  //Chaneg weather info
  const areaInfo = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.UnitType}</span>
        <span>&deg;C</span>
    </div>`;

  details.innerHTML = areaInfo;

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();


  updateCity(city)
    .then((res) => {
      updateUi(res);
    })
    .catch((err) => {
      console.log(err);
    });

    localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  const city = localStorage.getItem("city");

  updateCity(city)
    .then((res) => {
      updateUi(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
