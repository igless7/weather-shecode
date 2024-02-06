function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#speed");
    let timeElement = document.querySelector("#date");
    let date = new Date(response.data.time*1000);
    timeElement.innerHTML = formatDate(date);
    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.icon}" class="weather-app-icon">`;
  
    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    searchForecast(response.data.city);
    console.log(response.data);
}

function formatDate(date){
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if(minutes<10){
        minutes = `0${minutes}`;
    }

   return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = `58ce410f0od07a6a15e649f48tfbd393`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
    console.log(apiUrl);
}

function searchForecast(city) {
    let apiKey = `58ce410f0od07a6a15e649f48tfbd393`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    // we call the searCity function with the value
    searchCity(searchInput.value);
}

function formatDay(timestamp){
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu","Fri", "Sat"];
    let date = new Date(timestamp*1000);
    return days[date.getDay()];
}

function displayForecast(response) {
    console.log(response);
    
    forecastHtml = "";
    
    response.data.daily.forEach(function(day, index) {

        if(index < 5){
            forecastHtml = forecastHtml +`
            <div class="weather-forecast-day";>
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" alt="" width="67px">
            <div class="weather-forecast-temperature">
            <span class="weather-forecast-temp-max">${Math.round(day.temperature.maximum)}°</span>
            <span class="weather-forecast-temp-min">${Math.round(day.temperature.minimum)}°</span>
            </div>
            </div>
            `;
        }
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
    

}

let searchFormElement = document.querySelector("#search-form");
//SELECTED the entire form 
//when search btn clicked we call handleSearchSubmit
searchFormElement.addEventListener("submit",handleSearchSubmit);

searchCity("paris");
displayForecast();
