function renderWeather(currentTemp, currentFellsLike, currentHumidity,
    currentWindSpeed, currentMainWeather, nextDayTemp, nextDayMain,
    secondDayTemp, secondDayMain, thirdDayTemp, thirdDayMain, currentCity, currentCountry) {

        
        let d = new Date();
        
        let curr_date = d.getDate();
        let className = '';
        let nextClassName = '';
        let secondClassName = '';
        let thirdClassName = '';
        let curr_month = d.getMonth() + 1;
        let month_txt = '';

        if(currentMainWeather == 'Rain'){
            html.classList.remove("sunny");
            html.classList.remove("windy");
            html.classList.add("rain");
        }
        else if (currentMainWeather == 'Clear'){
            html.classList.remove("rain");
            html.classList.remove("windy");
            html.classList.add("sunny");
        }
        else if (currentMainWeather == 'Clouds'){
            html.classList.remove("rain");
            html.classList.remove("sunny");
            html.classList.add("windy");
        }

        if(curr_month == 1){
            month_txt = 'January';
        }
        else if (curr_month == 2){
            month_txt = 'February';
        }
        else if (curr_month == 3){
            month_txt = 'March';
        }
        else if (curr_month == 4){
            month_txt = 'April';
        }
        else if (curr_month == 5){
            month_txt = 'May';
        }
        else if (curr_month == 6){
            month_txt = 'June';
        }
        else if (curr_month == 7){
            month_txt = 'July';
        }
        else if (curr_month == 8){
            month_txt = 'August';
        }
        else if (curr_month == 9){
            month_txt = 'September';
        }
        else if (curr_month == 10){
            month_txt = 'October';
        }
        else if (curr_month == 11){
            month_txt = 'November';
        }
        else if (curr_month == 12){
            month_txt = 'December';
        }

        if(currentMainWeather == 'Rain'){
            className = 'rain-image';
        }
        else if (currentMainWeather == 'Clear') {
            className = 'sunny-image';
        }
        else if (currentMainWeather == 'Clouds') {
            className = 'cloud-image';
        }

        if(nextDayMain == 'Rain'){
            nextClassName = 'small-rain-image';
        }
        else if (nextDayMain == 'Clear') {
            nextClassName = 'small-sunny-image';
        }
        else if (nextDayMain == 'Clouds') {
            nextClassName = 'small-cloud-image';
        }

        if(secondDayMain == 'Rain'){
            secondClassName = 'small-rain-image';
        }
        else if (secondDayMain == 'Clear') {
            secondClassName = 'small-sunny-image';
        }
        else if (secondDayMain == 'Clouds') {
            secondClassName = 'small-cloud-image';
        }

        if(thirdDayMain == 'Rain'){
            thirdClassName = 'small-rain-image';
        }
        else if (thirdDayMain == 'Clear') {
            thirdClassName = 'small-sunny-image';
        }
        else if (thirdDayMain == 'Clouds') {
            thirdClassName = 'small-cloud-image';
        }

        mainContent = `
        <div class="weather-forecast">
        <div class="main-info">
            <span class="location">${currentCity}</span>,<span> ${currentCountry}</span><br>
            <span class="current-date">${month_txt}</span><span> - <span><span>${curr_date}</span>
            <p class="current-time"></p>
        </div>
        <div class="forecast">
            <div class="${className}"></div> 
            <span class="current-temp"> ${currentTemp}</span><span class="degree degree-div">°</span>
            <div class="overcast">
                <span class="feel">feels like</span>:<span class="feel-temp"> ${currentFellsLike}</span><span> °</span></p>
                <span class="wind">wind</span>:<span class="current-wind"> ${currentWindSpeed}</span> <span>m/s</span> <br>
                <span class="humidity">hunidity</span><span class="humidity-current">: ${currentHumidity}</span> <span>%</span> 
            </div>
        </div>
        <div class="three-days">
            <div class="first">
            <span class="day-name">${month_txt}</span><span> - </span><span class="nextDayDate">${curr_date+1}</span>
                <span class="day-temp next-day">${nextDayTemp}</span><span class="degree-small degree-small-div"> °</span>
                <div class="${nextClassName}"></div>
            </div>
            <div class="second">
                <span class="day-name">${month_txt}</span><span> - </span><span class="secondDayDate">${curr_date+2}</span>
                <span class="day-temp second-day">${secondDayTemp}</span><span class="degree-small"> °</span>
                <div class="${secondClassName}"></div>
            </div>
            <div class="third">
                <span class="day-name">${month_txt}</span><span> - </span><span class="thirdDayDate">${curr_date+3}</span>
                <span class="day-temp third-day">${thirdDayTemp}</span><span class="degree-small"> °</span>
                <div class="${thirdClassName}"></div>
            </div>
        </div>
        </div>
    `

    MAIN.innerHTML = mainContent;

    let first = document.querySelector(".first");
    let second = document.querySelector(".second");
    let third = document.querySelector(".third");

    let forecast = document.querySelector(".forecast");

    forecast.addEventListener('click', forecastSpeak);
    
    first.addEventListener('click', firstSpeak);
    second.addEventListener('click', secondSpeak);
    third.addEventListener('click', thirdSpeak);
    {
        (function(){
            let date = new Date();
            let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            document.querySelector(".current-time").innerHTML = time;
            window.setTimeout(arguments.callee, 1000);
        }) ();
    };

    
}

function loadStart() {
    MAIN.style.visibility = "hidden";
    MAPCONTAINER.style.visibility = "hidden";
}

function loadEnd() {
    MAIN.style.visibility = "visible";
    MAPCONTAINER.style.visibility = "visible";
}
