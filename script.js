window.addEventListener("load", function () {
// anonymous function

// parenthesis empty, not passing it a value
function getSearchValue() {
var searchValue = document.getElementById("form-input").value;
if (searchValue) {


    // passing it searchValue
searchWeather(searchValue);


}


}
// anything being  passed to the function needs a parameter when function is written
function searchWeather(searchValue) {
// template literal or string literal - have backticks
    var apiCall = `https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=32213800518e5adda67ca68fed9146b6`

}


document.querySelector("#search-button").addEventListener("click", getSearchValue);
}) 