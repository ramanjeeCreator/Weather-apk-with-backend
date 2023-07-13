// tooltip
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// placeholder change
const mediaQuery = window.matchMedia("(max-width: 350px)");
const cityNameInput = document.getElementById("cityName");
if (mediaQuery.matches) {
  cityNameInput.placeholder = "City Name...";
}
mediaQuery.addEventListener("change", (event) => {
  if (event.matches) {
    cityNameInput.placeholder = "City Name";
  } else {
    cityNameInput.placeholder = "Enter Your City Name";
  }
});

// main coding starts
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.querySelector("#temp>span");
let temp_status = document.getElementById("temp_status");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = "Please write the city name before search";
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=c54fe0db44ff57ac0e403c389fc3b3ae`;
      const response = await fetch(url);
      const arrData = await response.json();
      city_name.innerText = `${arrData.name}, ${arrData.sys.country}, ${arrData.weather[0].main}`;
      const tempMood = `${arrData.weather[0].main}`;
      const temp0 = Number(arrData.main.temp) - 273;
      temp.innerHTML = Math.floor(temp0);

      if (tempMood == "clear") {
        temp_status.innerHTML =
          "<i class='fa fa-sun' style='color: #eccc68'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fa fa-cloud' style='color: #f1f2f6'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fa fa-rain' style='color: #a4b0be'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fa fa-cloud' style='color: #f1f2f6'></i>";
      }
    } catch {
      city_name.innerText = "Please enter a valid city name";
    }
  }
};

submitBtn.addEventListener("click", getInfo);

// Week day codes
let dateToday = new Date();
let weekIndex = dateToday.getDay();
let weekDays = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
day.innerHTML = weekDays[weekIndex];

// Date codes
let date = dateToday.getDate();
let mainDate = date < 10 ? `0${date}` : date;

// Month codes
let monthIndex = dateToday.getMonth();
let monthNames = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};
let monthToday = monthNames[monthIndex];

// Year codes
let year = dateToday.getFullYear();

// Codes for Full date
today_date.innerHTML = `${mainDate} ${monthToday}, ${year}`;
