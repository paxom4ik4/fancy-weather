let mapCard = '';
function renderMap(currentLat, currentLon) {
    mapCard = `
        <div id="map" class="weather-map"></div>
        <span class="lat"><span class="lat-val">lat</span><span>: ${currentLat}</span></span>
        <span class="lon"><span class="lon-val">lon</span><span>: ${currentLon}</span></span>

        <p class="forecast-txt">Click on cards to hear the Forecast! Or click on microphone and say: "Forecast" <br>
        You can also find out information about your city by saying its name. <br>
        Turn on Microphone and say "Louder" or "Hush" to control the volume. <br>
        To speak another language: Deactivate microphone if it works. Change language. Turn on it again.
        </p>
    `

    MAPCONTAINER.innerHTML = mapCard;



    ymaps.ready(init);
    function init(){
        // Создание карты.
        let myMap = new ymaps.Map("map", {
            center: [currentLat, currentLon],
            zoom: 12
        });
        myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [currentLat, currentLon]
            },
            properties: {
                hintContent: 'Вы здесь'
            }
        }, {
            draggable: false
        });

        myMap.geoObjects
        .add(myGeoObject)
        
        .add(new ymaps.Placemark([currentLat, currentLon], {
        }, {
            iconColor: '#0095b6'
        }))
    };   

    
}



