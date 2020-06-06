let headerContent = '';

headerContent += `
        <div class="refresh-background">
            <div class="refresh-button"></div>
        </div>
        <div class="change-language">
        <ul class="topmenu">
            <li class="submenu-link">Cмена языка
            <ul class="submenu">
                <li class="ru">Русский</li>
                <li class="be">Белорусский</li>
                <li class="en">English</li>
            </ul>
            </li>
        </ul>
        </div>
        <div class="change-temperature">
            <div class="celcium active"></div>
            <div class="faren"></div>
        </div>
        <div class="header-text">
        </div>
    <div class="search">
        <div class="d1">
            <form class="form">
                <input type="text" class="input-text" placeholder="Поиск (Search)">
                <button type="submit" class="search-button">Поиск</button>
            </form>
        </div>
    </div>    
    
    <div class="microphone"></div>
`

HEADER.innerHTML = headerContent;



let celciumButton = document.querySelector(".celcium");
let fahrenButton = document.querySelector(".faren");

fahrenButton.addEventListener('click', fahrenConvert)

function celciumConvert() {
    let degree = document.querySelector(".degree");
    degree.style.left = "260px"

    let degreeSmall = document.querySelectorAll(".degree-small");
    degreeSmall.forEach(element => {
        element.style.left = "50px";
    });

    celciumButton.classList.add("active");
    fahrenButton.classList.remove("active");

    let currentTemp = document.querySelector(".current-temp");
    let currentTempValue = currentTemp.innerHTML;
    console.log(currentTempValue);
    let nextDayTemp = document.querySelector(".next-day");
    let secondDayTemp = document.querySelector(".second-day");
    let thirdDayTemp = document.querySelector(".third-day");
    let feelsLikeTemp = document.querySelector(".feel-temp");

    let nextDayTempValue = nextDayTemp.innerHTML;
    let secondDayTempValue = secondDayTemp.innerHTML;
    let thirdDayTempValue = thirdDayTemp.innerHTML;
    let feelsLikeTempValue = feelsLikeTemp.innerHTML;
    
    currentTemp.innerText = Math.floor(((currentTempValue - 32) * 5)/9);
    nextDayTemp.innerText = Math.floor(((nextDayTempValue - 32) * 5)/9);
    secondDayTemp.innerText = Math.floor(((secondDayTempValue - 32) * 5)/9);
    thirdDayTemp.innerText = Math.floor(((thirdDayTempValue - 32) * 5)/9);  
    feelsLikeTemp.innerText = Math.floor(((feelsLikeTempValue - 32) * 5)/9);

    celciumButton.removeEventListener('click', celciumConvert);
    fahrenButton.addEventListener('click', fahrenConvert)
}

function fahrenConvert(){
    let degree = document.querySelector(".degree");
    degree.style.left = "360px"

    let degreeSmall = document.querySelectorAll(".degree-small");
    degreeSmall.forEach(element => {
        element.style.left = "80px";
    });

    fahrenButton.classList.add("active");
    celciumButton.classList.remove("active");

    let currentTemp = document.querySelector(".current-temp");
    let currentTempValue = currentTemp.innerHTML;

    let nextDayTemp = document.querySelector(".next-day");
    let secondDayTemp = document.querySelector(".second-day");
    let thirdDayTemp = document.querySelector(".third-day");
    let feelsLikeTemp = document.querySelector(".feel-temp");

    let nextDayTempValue = nextDayTemp.innerHTML;
    let secondDayTempValue = secondDayTemp.innerHTML;
    let thirdDayTempValue = thirdDayTemp.innerHTML;
    let feelsLikeTempValue = feelsLikeTemp.innerHTML;
    
    currentTemp.innerText = (( currentTempValue * 9 )/5) + 32;
    nextDayTemp.innerText = (( nextDayTempValue * 9 )/5) + 32;
    secondDayTemp.innerText = (( secondDayTempValue * 9 )/5) + 32;
    thirdDayTemp.innerText = (( thirdDayTempValue * 9 )/5) + 32;
    feelsLikeTemp.innerText = (( feelsLikeTempValue * 9 )/5) + 32;

    fahrenButton.removeEventListener('click', fahrenConvert);
    celciumButton.addEventListener('click', celciumConvert);
}

localStorage.setItem("language", 'en-EN');

const ruButton = document.querySelector(".ru");
const enButton = document.querySelector(".en");
const beButton = document.querySelector(".be");

ruButton.addEventListener('click', rusText);
enButton.addEventListener('click', enText);
beButton.addEventListener('click', beText);

async function getTranslationBel(word) {
    let response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200424T123704Z.20495078d07340ab.0a8c19413f7291513d399c7f843a551590fb7636&text=${word}&lang=en-be`);
    let data = await response.json();
    return data;
}

async function getTranslation(word){
    let response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200424T123704Z.20495078d07340ab.0a8c19413f7291513d399c7f843a551590fb7636&text=${word}&lang=en-ru`);
    let data = await response.json();
    return data;
}

async function getTranslationRus(word){
    let response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200424T123704Z.20495078d07340ab.0a8c19413f7291513d399c7f843a551590fb7636&text=${word}&lang=ru-en`);
    let data = await response.json();
    return data; 
}

function beText(){

    let currentCityDiv = document.querySelector(".location");
    let currentCity = document.querySelector(".location").innerText;
    let currentMonthDiv = document.querySelector(".current-date");
    let currentMonth = document.querySelector(".current-date").innerText;
    let nextDayDiv = document.querySelectorAll(".day-name");
    let feel = document.querySelector(".feel").innerText;
    let feelDiv = document.querySelector(".feel");
    let wind = document.querySelector(".wind").innerText;
    let windDiv = document.querySelector(".wind");
    let humidity = document.querySelector(".humidity").innerText;
    let humidityDiv = document.querySelector(".humidity");
    let lat = document.querySelector(".lat-val");
    let lon = document.querySelector(".lon-val");
    
    let mapTxt = document.querySelector(".forecast-txt");

    function render() {
        getTranslationBel(currentMonth)
            .then (data => {
                console.log(data);
                let translatedMounth = data.text;
                currentMonthDiv.innerText = translatedMounth;
                nextDayDiv.forEach(element => {
                    element.innerText = translatedMounth;
                });
            });

            getTranslationBel(currentCity)
            .then (data => {
                let translatedMounth = data.text;
                currentCityDiv.innerText = translatedMounth;
            });
            feelDiv.innerText = ' адчувае, як';
            windDiv.innerText = ' вецер';
            humidityDiv.innerText = ' вільготнасць';

        
        lat.innerText = " шырата";
        lon.innerText = " даўгата";
        
        mapTxt.innerHTML = `
        Націсніце на карткі, каб пачуць прагноз! Або націсніце на мікрафон і скажыце: "Прогноз" <br>
        Вы таксама можаце даведацца інфармацыю аб вашым горадзе, сказаўшы яго назва. <br>
        Уключыце мікрафон і прамоўце «Громче» або «Тише», каб кантраляваць гучнасць. <br>
        Каб гаварыць на іншай мове: адключыце мікрафон, калі ён працуе. Змена мовы. Уключыце яго зноў.
        `
    }
    render(); 

    localStorage.setItem("language", 'ru-RU');
}

function enText(){
    let currentCityDiv = document.querySelector(".location");
    let currentCity = document.querySelector(".location").innerText;
    let currentMonthDiv = document.querySelector(".current-date");
    let currentMonth = document.querySelector(".current-date").innerText;
    let nextDayDiv = document.querySelectorAll(".day-name");
    let feel = document.querySelector(".feel").innerText;
    let feelDiv = document.querySelector(".feel");
    let wind = document.querySelector(".wind").innerText;
    let windDiv = document.querySelector(".wind");
    let humidity = document.querySelector(".humidity").innerText;
    let humidityDiv = document.querySelector(".humidity");
    let lat = document.querySelector(".lat-val");
    let lon = document.querySelector(".lon-val");
    let mapTxt = document.querySelector(".map-txt");
    
    function render() {
        getTranslationRus(currentMonth)
            .then (data => {
                let translatedMounth = data.text;
                currentMonthDiv.innerText = translatedMounth;
                nextDayDiv.forEach(element => {
                    element.innerText = ` ${translatedMounth}`;
                });
            });

            getTranslationRus(currentCity)
            .then (data => {
                let translatedMounth = data.text;
                currentCityDiv.innerText = translatedMounth;
            });

            feelDiv.innerText = ' feels like';
            windDiv.innerText = ' wind';
            humidityDiv.innerText = ' humidity';

        
        lat.innerText = " lat";
        lon.innerText = " lon";
        
        mapTxt.innerHTML = `
        Click on cards to hear the Forecast! Or click on microphone and say: "Forecast" <br>
        You can also find out information about your city by saying its name. <br>
        Turn on Microphone and say "Louder" or "Hush" to control the volume. <br>
        To speak another language: Deactivate microphone if it works. Change language. Turn on it again.
        `
    }
    render(); 

    localStorage.setItem("language", 'en-EN');
}


function rusText(){

    let currentCityDiv = document.querySelector(".location");
    let currentCity = document.querySelector(".location").innerText;
    let currentMonthDiv = document.querySelector(".current-date");
    let currentMonth = document.querySelector(".current-date").innerText;
    let nextDayDiv = document.querySelectorAll(".day-name");
    let feel = document.querySelector(".feel").innerText;
    let feelDiv = document.querySelector(".feel");
    let wind = document.querySelector(".wind").innerText;
    let windDiv = document.querySelector(".wind");
    let humidity = document.querySelector(".humidity").innerText;
    let humidityDiv = document.querySelector(".humidity");
    let lat = document.querySelector(".lat-val");
    
    let lon = document.querySelector(".lon-val");
    
    let mapTxt = document.querySelector(".forecast-txt");
    function render() {
        getTranslation(currentMonth)
            .then (data => {
                let translatedMounth = data.text;
                currentMonthDiv.innerText = translatedMounth;
                nextDayDiv.forEach(element => {
                    element.innerText = translatedMounth;
                });
            });

        getTranslation(currentCity)
            .then (data => {
                let translatedMounth = data.text;
                currentCityDiv.innerText = translatedMounth;
            });

            feelDiv.innerText = 'ощущается как';
            windDiv.innerText = 'ветер';
            humidityDiv.innerText = 'влажность';

        lat.innerText = "Широта";
        lon.innerText = "Долгта";

        mapTxt.innerHTML = `
        Нажмите на карточки, чтобы услышать прогноз! Или нажмите на микрофон и скажите: «Прогноз» <br>
        Вы также можете узнать информацию о вашем городе, сказав его название. <br>
        Включите микрофон и произнесите «Громче» или «Тише», чтобы контролировать громкость. <br>
        Чтобы говорить на другом языке: отключите микрофон, если он работает. Изменените языка. Включите его снова.
        `
        
    }
    render(); 
    localStorage.setItem("language", 'ru-RU');
}

const btnRecognize = document.querySelector(".microphone");


function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;


class Recognizer {
    constructor() {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = localStorage.getItem("language");
      if (!isMobile()) {
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
      }
      this.isRecognizing = false;
      this.transcript = "";
}

start(handler) {
    btnRecognize.classList.remove("microphone");
    btnRecognize.classList.add("microphone-active");
    this.transcript = "";
    this.recognition.onresult = (event) => {
      this.onResult(event, handler);
    };
    this.recognition.start();
    this.isRecognizing = true;
  }
  
  stop() {
    btnRecognize.classList.add("microphone");
    btnRecognize.classList.remove("microphone-active");
    this.recognition.abort();
    this.isRecognizing = false;
  }
  
  onResult(event, handler) {
    let interim_transcript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        let result = event.results[i];
      if (result.isFinal) {
          console.log(result[0].transcript);
        this.transcript += result[0].transcript;
        if(result[0].transcript.replace(/\s+/g, '') == "forecast" || result[0].transcript.replace(/\s+/g, '') == "прогноз"){
            speakWeather();
        }
        else if (result[0].transcript.replace(/\s+/g, '') == "louder" || result[0].transcript.replace(/\s+/g, '') == "громче"){
            louder();
        }
        else if (result[0].transcript.replace(/\s+/g, '') == "hush" || result[0].transcript.replace(/\s+/g, '') == "тише"){
            hush();
        }
        else{
            getWeather(result[0].transcript);
        }
      } else {
        interim_transcript += result[0].transcript;
      }
    }
  }
}

const recognizer = new Recognizer();

function start() {
    recognizer.start();
}
  
function stop() {
    recognizer.stop();
}
  
function createMicro(){
    
}
btnRecognize.addEventListener("click", () => {
    if (!recognizer.isRecognizing) {
        start();
    } else {
        stop();
    }
});



localStorage.setItem("volume", 0.5);

function louder() {
    let currentVolume = Number(localStorage.getItem("volume"));
    if(currentVolume >= 1){
        return 0
    }
    else{
        currentVolume += 0.3;
        localStorage.setItem("volume", currentVolume);
    } 
}
function hush() {
    let currentVolume = Number(localStorage.getItem("volume"));
    if(currentVolume <= 0){
        return 0
    }
    else{
        currentVolume -= 0.3;
        localStorage.setItem("volume", currentVolume);
    } 
}

function speakWeather() {
    function speak(text) {
        const message = new SpeechSynthesisUtterance();
        message.volume = localStorage.getItem("volume");
        message.lang = localStorage.getItem("language");
        message.text = text;
        window.speechSynthesis.speak(message);
      }
      
    let currentTemp = document.querySelector(".current-temp").innerHTML;
    let feelsLike = document.querySelector(".feel-temp").innerHTML;
    let wind = document.querySelector(".current-wind").innerHTML;
    let humidity = document.querySelector(".humidity-current").innerHTML;

    let nextDayDate = document.querySelector(".nextDayDate").innerText;
    let secondDayDate = document.querySelector(".secondDayDate").innerText;
    let thirdDayDate = document.querySelector(".thirdDayDate").innerText;
 
    let currentMonth = document.querySelector(".current-date").innerText;
    
    let nextDayTemp = document.querySelector(".next-day").innerText;
    let secondDayTemp = document.querySelector(".second-day").innerText;
    let thirdDayTemp = document.querySelector(".third-day").innerText;

    let lang = localStorage.getItem("language");
    let txtMessage = '';
    if(lang == "ru-RU") {
        txtMessage = `Прогноз на сегодня: ${currentTemp} градусов выше нуля. Ощущается как ${feelsLike}.
        скорость ветра $ {wind} метров в секунду. Влажность составляет ${humidity} процентов...
        Что касается ${nextDayDate} ${currentMonth}, температура составляет ${nextDayTemp} градусов.
        На ${secondDayDate}  ${currentMonth} температура составляет ${secondDayTemp} градусов.
        А для ${thirdDayDate}  ${currentMonth} температура составляет ${thirdDayTemp} градусов.`
    }
    else if (lang == "en-EN"){
        txtMessage = `Forecast for today: ${currentTemp} degree above zero. Fells like ${feelsLike} degree.
        wind is ${wind} meters per second. Humidity is ${humidity} precent...
        As for the ${nextDayDate} of ${currentMonth} the temperature is ${nextDayTemp} degree.
        On the ${secondDayDate} of ${currentMonth} temperature is ${secondDayTemp} degree.
        And on the ${thirdDayDate} of ${currentMonth} temperature is ${thirdDayTemp} degree.`
    };  

    speak(txtMessage);
}
function firstSpeak() {
    function speak(text) {
        const message = new SpeechSynthesisUtterance();
        message.volume = localStorage.getItem("volume");
        message.lang = localStorage.getItem("language");
        message.text = text;
        window.speechSynthesis.speak(message);
    }
    let nextDayDate = document.querySelector(".nextDayDate").innerText;
    let currentMonth = document.querySelector(".current-date").innerText;
    let nextDayTemp = document.querySelector(".next-day").innerText;
    let lang = localStorage.getItem("language");
    let txtMessage = '';
    if(lang == "ru-RU"){
        txtMessage = `
        На ${nextDayDate} ${currentMonth} температура ${nextDayTemp} градусов.`;
    }
    else if(lang == "en-EN"){
        txtMessage = `
    As for the ${nextDayDate} of ${currentMonth} the temperature is ${nextDayTemp} degree.`;
    }  
    speak(txtMessage);
}

function secondSpeak() {
    function speak(text) {
        const message = new SpeechSynthesisUtterance();
        message.volume = localStorage.getItem("volume");
        message.lang = localStorage.getItem("language");
        message.text = text;
        window.speechSynthesis.speak(message);
    }
    let secondDayDate = document.querySelector(".secondDayDate").innerText;
    let currentMonth = document.querySelector(".current-date").innerText;
    let secondDayTemp = document.querySelector(".second-day").innerText;
    let lang = localStorage.getItem("language");
    let txtMessage = '';
    if(lang == "ru-RU"){
        txtMessage = `
        На ${secondDayDate} ${currentMonth} температура ${secondDayTemp} градусов.`;
    }
    else if(lang == "en-EN"){
        txtMessage = `
        On the ${secondDayDate} of ${currentMonth} temperature is ${secondDayTemp} degree.` ; 
    }
    speak(txtMessage);
}

function thirdSpeak() {
    function speak(text) {
        const message = new SpeechSynthesisUtterance();
        message.volume = localStorage.getItem("volume");
        message.lang = localStorage.getItem("language");
        message.text = text;
        window.speechSynthesis.speak(message);
    }
    let thirdDayDate = document.querySelector(".thirdDayDate").innerText;
    let currentMonth = document.querySelector(".current-date").innerText;
    let thirdDayTemp = document.querySelector(".third-day").innerText;
    let lang = localStorage.getItem("language");
    let txtMessage = '';
    if(lang == "ru-RU"){
        txtMessage = `
        На ${thirdDayDate} ${currentMonth} температура ${thirdDayTemp} градусов.`;
    }
    else if(lang == "en-EN"){
        txtMessage = `
    And on the ${thirdDayDate} of ${currentMonth} temperature is ${thirdDayTemp} degree.`;
    }
    
    speak(txtMessage);
}

function forecastSpeak() {
    function speak(text) {
        const message = new SpeechSynthesisUtterance();
        message.volume = localStorage.getItem("volume");
        message.lang = localStorage.getItem("language");
        message.text = text;
        window.speechSynthesis.speak(message);
      }
      
    let currentTemp = document.querySelector(".current-temp").innerHTML;
    let feelsLike = document.querySelector(".feel-temp").innerHTML;
    let wind = document.querySelector(".current-wind").innerHTML;
    let humidity = document.querySelector(".humidity-current").innerHTML;
    let lang = localStorage.getItem("language");
    let txtMessage = '';
    if(lang == "ru-RU"){
        txtMessage = `Прогноз на сегодня: ${currentTemp} градусов выше нуля. Ощущается как ${feelsLike}.
        скорость ветра $ {wind} метров в секунду. Влажность составляет ${humidity} процентов...`;
    }
    else if(lang == "en-EN"){
        txtMessage = `Forecast for today: ${currentTemp} degree above zero. Fells like ${feelsLike} degree.
        wind is ${wind} meters per second. Humidity is ${humidity} precent...` ;   
    }  
    speak(txtMessage);
}