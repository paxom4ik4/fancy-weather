// Смена фона по клику
localStorage.setItem('background', 1);

const changeBackButton = document.querySelector(".refresh-background");
const html = document.querySelector("html");

changeBackButton.addEventListener('click', changeBackground);

function changeBackground() {
  let currentBack = localStorage.getItem('background');
  if(currentBack == 1) {
    html.classList.remove("rain");
    html.classList.remove("windy");
    html.classList.add("sunny");
    localStorage.setItem('background', 2);
  }
  else if (currentBack == 2){
    html.classList.remove("sunny");
    html.classList.remove("rain");
    html.classList.add("windy");
    localStorage.setItem('background', 3);
  }
  else if (currentBack == 3) {
    html.classList.remove("windy");
    html.classList.remove("sunny");
    html.classList.add("rain");
    localStorage.setItem('background', 1);
  }
}

// геокодинг
function getGeoCode() {
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=Minsk&key=057c5b9e6fc64a83897da633d20cfd25';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      });
}

// getGeoLocation();


// Геолокация

function getGeoLocation() {
  const url = 'https://ipinfo.io/json?token=0defd3145278ff';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let currentCity = data.city;
      getWeather(currentCity);
    });
}

getGeoLocation();

// Погода

function getWeather(currentCity) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&lang=ua&units=metric&APPID=2af111bb9967d0386a40a1a68e39af9b`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if(data.cod == 404){
        let headerInput = document.querySelector(".header-text");
        headerInput.innerText = "Can not find this city..."; 
      }
      else {
        loadStart();
        let headerInput = document.querySelector(".header-text");
        headerInput.innerText = "";

        let currentTemp = Math.floor(data.list[0].main.temp);
        let currentFellsLike = Math.floor(data.list[0].main.feels_like);
        let currentHumidity = data.list[0].main.humidity;
        let currentWindSpeed = data.list[0].wind.speed;
        let currentMainWeather = data.list[0].weather[0].main;
        let nextDayTemp = Math.floor(data.list[6].main.temp);
        let nextDayMain = data.list[6].weather[0].main;
        let secondDayTemp = Math.floor(data.list[12].main.temp);
        let secondDayMain = data.list[12].weather[0].main;
        let thirdDayTemp = Math.floor(data.list[18].main.temp);
        let thirdDayMain = data.list[18].weather[0].main;
        let currentCity = data.city.name;
        let currentCountry = data.city.country;


        let currentLat = data.city.coord.lat;
        let currentLon = data.city.coord.lon;

        renderWeather(currentTemp, currentFellsLike, currentHumidity,
        currentWindSpeed, currentMainWeather, nextDayTemp, nextDayMain,
        secondDayTemp, secondDayMain, thirdDayTemp, thirdDayMain, currentCity, currentCountry);

        renderMap(currentLat, currentLon);
        loadEnd();
      }
    });
}



const searchButton = document.querySelector(".search-button");
const inputArea = document.querySelector(".input-text");

searchButton.addEventListener('click', searchWeather);

function searchWeather(e) {
  e.preventDefault();
  let inputValue = inputArea.value;
  if(inputValue == ""){
      let headerInput = document.querySelector(".header-text");
      headerInput.innerText = "Please, input something...";
  }
  else {
    let headerInput = document.querySelector(".header-text");
    headerInput.innerText = "";
    getWeather(inputValue);
  }
  
}
