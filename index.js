function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;

}

let apiKey = `58ce410f0od07a6a15e649f48tfbd393`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query={query}&key={key}`
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);