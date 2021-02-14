const weather=document.querySelector(".js_weather");

const API_KEY="7509dfc0a273d93add54adfa59033b75";
const COORDS='coords';
 
function getWeather(lat,lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            const temparature=json.main.temp;
            const place=json.name;
            weather.innerText=`${temparature} @ ${place}`;
        });

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleSuccess(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleError(){
    console.log("Can not access");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleSuccess,handleError);
}

function loadCoords(){
    const loaded=localStorage.getItem(COORDS);
    if(loaded===null){
        askForCoords();
    }
    else{
        const parseCoords=JSON.parse(loaded);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function main(){
    loadCoords();
}

main();