const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2021, 1, 20, 16, 42, 0);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const day = weekdays[futureDate.getDay()];
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const isAfternoon = hours < 12 ? "am" : "pm";

giveaway.textContent = `giveaway ends at ${day} on ${date} ${month} ${year} ${hours}:${minutes}${isAfternoon}`;

//future time in ms
const futureTime = futureDate.getTime();

const timer = setInterval(() => {
  getRemainingTime();
}, 1000);


const getRemainingTime = ()=> {
  const today = new Date().getTime();
  const diff = futureDate - today;

  /* 
    1sec = 1000ms
    1min = 60sec
    1hr = 60min
    1day = 24hr
  */

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  let days = diff / oneDay;
  days = Math.floor(days);

  let hours = Math.floor((diff % oneDay) / oneHour);
  let mins = Math.floor((diff % oneHour) / oneMin);
  let seconds = Math.floor((diff % oneMin) / 1000);

  //set values array
  const values = [days, hours, mins, seconds];

  const format = (item) => {
    return item < 10 ? `0${item}` : item
  }
  items.forEach((el, index) => {
    el.innerHTML = format(values[index])
  });

  if(diff < 0){
    deadline.innerHTML = '<h4>Sorry the Giveway Has Expired!</h4>';
    clearTimeout(timer)
  }
}

