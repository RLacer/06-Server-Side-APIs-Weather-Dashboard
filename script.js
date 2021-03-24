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
                todayEl.textContent = `${data.name} (${new Date().toLocaleDateString()})`;
                console.log(todayEl);

                var cardEl = document.createElement("div");
                cardEl.classList.add("card");
                var windEl = document.createElement("p");
                windEl.classList.add("card-text");
                var humidityEl = document.createElement('p');
                humidityEl.classList.add("card-text");
                var temperatureEl = document.createElement("p");
                temperatureEl.classList.add("card-text");
                





            })
    }

    document.querySelector("#search-button").addEventListener("click", getSearchValue);
})