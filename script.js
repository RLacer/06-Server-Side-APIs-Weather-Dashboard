window.addEventListener("load", function () {
    // anonymous function
    var existingHistory
    if (!JSON.parse(localStorage.getItem("history"))) {
        existingHistory = [];

    } else {
        existingHistory = JSON.parse(localStorage.getItem('history'))
    }
    var historyItems = [];

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
        var apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=imperial&appid=32213800518e5adda67ca68fed9146b6`
        // adding fetch

        fetch(apiCall)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                if (!existingHistory.includes(searchValue)) {
                    // passing the function searchValue
                    // handleHistory(searchValue)
                }
                todayEl = document.getElementById("today");
                todayEl.textContent = "";

                var titleEl = document.createElement("h3");
                titleEl.classList.add("card-title");
                titleEl.textContent = `${data.name} (${new Date().toLocaleDateString()})`;
                console.log(todayEl);
                // adding dynamically created elements
                var cardEl = document.createElement("div");
                cardEl.classList.add("card");
                var windEl = document.createElement("p");
                windEl.classList.add("card-text");
                var humidityEl = document.createElement('p');
                humidityEl.classList.add("card-text");
                var temperatureEl = document.createElement("p");
                temperatureEl.classList.add("card-text");

                windEl.textContent = `Wind Speed: ${data.wind.speed} mph`;
                humidityEl.textContent = `Humidity: ${data.main.humidity} %`;
                temperatureEl.textContent = `Temp: ${data.main.temp} °F`;

                var cardbodyEl = document.createElement("div");
                cardbodyEl.classList.add("card-body");
                var imageEl = document.createElement("img");
                imageEl.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

                titleEl.appendChild(imageEl);
                cardbodyEl.appendChild(titleEl);
                cardbodyEl.appendChild(windEl);
                cardbodyEl.appendChild(humidityEl);
                cardbodyEl.appendChild(temperatureEl);
                cardEl.appendChild(cardbodyEl);
                todayEl.appendChild(cardEl);

                getForecast(searchValue);
                // getUvIndex(data.coord.lat, data.coord.lon);


            })
    }

    function getForecast(searchValue) {
        var apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=imperial&appid=32213800518e5adda67ca68fed9146b6`
        fetch(apiCall)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
    
            })
    }

    document.querySelector("#search-button").addEventListener("click", getSearchValue);
})