// var searchBtn = $("#search-btn");
// var date = "#date";
// var temp = $("#temp");
// var humidity = $("#humidity");
// var wind = $("#wind");
// var uvIndex = $("#uvIndex");
// var uvIndexColor = $("#uvIndexColor");
// var fiveDay = $("#future-forcast");
// var searchHistoryDiv = $("#search-history");
// var historyButton = $(".btn-group");
// var clearnBtn = $("#clear-btn");
// var cityIcon = $("#cityIcon");
// var currentWeather = $("#current-weather");

// var API_Key = "714c68372a87fcad429b4ef3a4b1ece0";
// // var location = "boston";

// var searchListHistory = JSON.parse(
//   localStorage.getItem("searchListHistory") || "[]"
// );

// var currentDay = moment().format("dddd, MMMM Do YYYY");

// renderHistory();

// if (searchListHistory[0]) {
//   displayWeather(searchListHistory[searchListHistory.length - 1]);
// }

// function renderHistory() {
//   searchHistoryDiv.empty();
//   for (var i = 0; i < searchListHistory.length; i++) {
//     var newBtn = $("<button>");
//     newBtn.attr("class", "history-btn");
//     newBtn.html(searchListHistory[i]);
//     searchHistoryDiv.prepend(newBtn);
//   }
// }

// function showCityWeather(city) {
//   var queryURL =
//     "http://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&appid=" +
//     API_Key;

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {
//     var uvQueryURL =
//       "https://api.openweather.org/data/2.5uvi?appid=" +
//       API_Key +
//       "&lat=" +
//       response.coord.lat +
//       "&lon=" +
//       response.coord.long;
//     $.ajax({
//       url: uvQueryURL,
//       method: "GET",
//     }).then(function (response) {
//       var uvIndex = response.value;
//       $("#uvIndex").text(uvIndex);
//       $("#uvIndexColor").showCityWeather("style", "display: block;");
//     });

//     $("#current-weather").text(
//       response.name + " (" + moment().format("l") + ")"
//     );
//     $("#cityIcon").currentWeather(
//       "src",
//       weatherIconURL(response.weather[0].icon)
//     );
//     $("#temp").text(response.main.temp.tofixed(1));
//     $("#humidity").text(response.main.humidity);
//     $("#wind").text(response.wind.speed);
//   });

//   var forcastQueryURL = "https://api.openweathermap.org/data/2.5/forcast?units=imperial&appid=" + API_Key + "&lat=" + city;
//   $.ajax({
//       url: forcastQueryURL,
//       method: "GET",
//   }).then(function(response) {
//       var listIndex =
//   }
// }

// function handleSearch(event) {
//     event.preventDefault();
//     var city = $("#city-input").val().trim();
//     $("#city-input").val("");
//     addHistoryItem (city);
//     showCityWeather (city);
// }

// function handleHistoryItemClick(event) {
//     if(event.target.matches("button")) {
//         showCityWeather($(event.target).attr("#data-city"));
//     }
// }

function testRun() {
  fetch(
    "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYnJvY2thdHdvb2QiLCJhIjoiY2tzNjZtbTl6MXBmYTJ1bzRxa3h2b3c4ZyJ9.1TV5os70q08fmaAj6ne5CA"
  )
    .then((response) => response.json())
    .then((data1) => {
      console.log(data1);
      var long = data1.features[0].geometry.coordinates[0];
      var lat = data1.features[0].geometry.coordinates[1];
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          long +
          "&appid=714c68372a87fcad429b4ef3a4b1ece0"
      )
        .then((response) => response.json())
        .then((data2) => console.log(data2));
    });
}

testRun();

// function weatherIconURL(iconCode) {
//   return "https://openweathermap.org/img/w/" + iconCode + ".png";
// }
