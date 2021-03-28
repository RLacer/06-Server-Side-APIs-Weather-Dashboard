window.addEventListener("load", function () {
    // anonymous function
    var existingHistory
    if (!JSON.parse(localStorage.getItem("form-input"))) {
        existingHistory = [];

    } else {
        existingHistory = JSON.parse(localStorage.getItem("history"))
    }
    var historyItems = [];

    if (existingHistory && existingHistory.length > 0) {
        existingHistory.forEach(item => makeRow(item));

    }

    function makeRow(searchValue) {
        var liEl = document.createElement('li');
        liEl.classList.add("list-group-item", "list-group-item-action");
        liEl.id = searchValue;
        liEl.textContent = searchValue;

        liEl.addEventListener("click", function (e) {
            if (e.target.tagName === "LI") {
                searchWeather(e.target.textContent);
            }
        });
        document.getElementById("history").appendChild(liEl);
    }
    // parenthesis empty, not passing it a value
    function getSearchValue() {
        var searchValue = document.getElementById("form-input").value;
        if (searchValue) {

            // passing it searchValue
            searchWeather(searchValue);
            makeRow(searchValue);
            document.querySelector("#form-input");
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
                    handleHistory(searchValue)
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
                imageEl.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);


                // destination goes first, elements appended to cardbody
                titleEl.appendChild(imageEl);
                cardbodyEl.appendChild(titleEl);
                cardbodyEl.appendChild(windEl);
                cardbodyEl.appendChild(humidityEl);
                cardbodyEl.appendChild(temperatureEl);
                cardEl.appendChild(cardbodyEl);
                todayEl.appendChild(cardEl);

                getForecast(searchValue);
                getUvIndex(data.coord.lat, data.coord.lon);

            })
    }
    // checking local storage
    var handleHistory = (searchValue) => {
        if (existingHistory && existingHistory.length > 0) {
            var existingEntries = JSON.parse(localStorage.getItem("history"));
            var newHistory = [existingEntries, searchValue];
            localStorage.setItem("history", JSON.stringify(newHistory));

        }
        else {
            historyItems.push(searchValue);
            localStorage.setItem("history", JSON.stringify(historyItems));
        }
    }

    function getForecast(searchValue) {
        var apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=imperial&appid=32213800518e5adda67ca68fed9146b6`
        fetch(apiCall)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var forecastEl = document.getElementById("forecast");
                forecastEl.innerHTML = ("<h4 class='mt-3'> 5 Day Forecast: </h4>");
                // creating forecast place
                var forecastRowEl = document.createElement("div");
                forecastEl.classList.add("row");

                for (var i = 0; i < data.list.length; i++) {

                    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                        var columnEl = document.createElement("div");
                        columnEl.classList.add("col-md-2");
                        var cardEl = document.createElement("div");
                        cardEl.classList.add("card", "bg-primary", "text-white");
                        var cardbodyEl = document.createElement("div");
                        cardbodyEl.classList.add("card-body", "p-2");
                        // p-2 bootstrap class that adds padding

                        var titleEl = document.createElement("h5");
                        titleEl.classList.add("card-title");
                        titleEl.textContent = new Date(
                            data.list[i].dt_txt

                        ).toLocaleDateString();


                        // weather icon , temp for future
                        var temperatureEl = document.createElement("p");
                        temperatureEl.classList.add("card-text");
                        temperatureEl.textContent = `Temp: ${data.list[i].main.temp} °F`;


                        var humidityEl = document.createElement("p");
                        humidityEl.classList.add("card-text");
                        humidityEl.textContent = `Humidity: ${data.list[i].main.humidity} %`;

                        var imageEl = document.createElement("img");
                        imageEl.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`);
                        columnEl.appendChild(cardEl);

                        cardbodyEl.appendChild(titleEl);
                        cardbodyEl.appendChild(imageEl);
                        cardbodyEl.appendChild(temperatureEl);
                        cardbodyEl.appendChild(humidityEl)
                        cardEl.appendChild(cardbodyEl);
                        forecastEl.appendChild(columnEl);

                    }
                }
            })
    }
    function getUvIndex(lat, lon) {
        var apiCall = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=32213800518e5adda67ca68fed9146b6`;
        fetch(apiCall)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var cardbodyEl = document.querySelector(".card-body");
                var uvEl = document.createElement("p");
                uvEl.id = "uv";
                uvEl.textContent = "UV Index: ";
                var buttonEl = document.createElement("span");
                buttonEl.classList.add("btn", "btn-sm");
                console.log(data);
                buttonEl.innerHTML = data.value;
                console.log(data.value);
                // button color for UV
                if (data.value < 3) {

                    buttonEl.classList.add("btn-success");

                } else if (data.value < 7) {

                    buttonEl.classList.add("btn-warning");
                }
                else {
                    buttonEl.classList.add("btn-danger");
                }

                cardbodyEl.appendChild(uvEl);
                uvEl.appendChild(buttonEl);

            })
    }
    document.querySelector("#search-button").addEventListener("click", getSearchValue);
})