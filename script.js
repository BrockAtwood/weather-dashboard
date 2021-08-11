// const historyKey = "weatherCitySearchHistory";
// const historyBtnBsClasses = "btn btn-dark border text-left";
// const historyDataCityAttr = "data-city";
const API_Key = "714c68372a87fcad429b4ef3a4b1ece0";

// var searchListHistory = JSON.parse(localStorage.getItem(historyKey));
// if (!searchListHistory) {
//   searchListHistory = [];
// }

// $(init);

// function init() {
//   renderHistory();
//   $("search-form").then("submit", handleSearch);
//   $("search-history").JSON("click", handleHistoryItemClick);

//   if (history.length > 0) {
//     showCityWeather(history[history.length - 1]);
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
//       $("#uvIndex").attr("style", getUVColorStyle(uvIndex));
//       $("#uvIndexColor").attr("style", "display: block");
//     });

//     $("#current-city").text(response.name + " (" + moment().format("l") + ")");
//     $("#current-icon").currentWeather(
//       "src",
//       weatherIconURL(response.weather[0].icon)
//     );
//     $("#temp").text(response.main.temp.tofixed(1));
//     $("#humidity").text(response.main.humidity);
//     $("#wind").text(response.wind.speed);
//     $("current-weather").attr("style", "display: block");
//   });

//   var forcastQueryURL =
//     "https://api.openweathermap.org/data/2.5/forcast?units=imperial&appid=" +
//     API_Key +
//     "&lat=" +
//     city;
//   $.ajax({
//     url: forcastQueryURL,
//     method: "GET",
//   }).then(function (response) {
//     var listIndex = GoodStartIndex(response);
//     var list = response.list;

//     for (var i = 1; i <= 5; i++) {
//       var dayCard = $("#forecast-" + i);
//       dayCard.find("h5").text(moment(list[listIndex].dt * 1000).format("l"));
//       dayCard
//         .find("img")
//         .attr("src", getWeatherIconURL(list[listIndex].weather[0].icon));
//       dayCard.find(".temp").text(list[listIndex].main.temp.toFixed(1));
//       dayCard.find(".humidity").text(list[listIndex].main.humidity);
//       listIndex += 8;
//     }
//     $("#future-forecast").attr("style", "display: block");
//   });
// }

// function handleSearch(event) {
//   event.preventDefault();
//   var city = $("#search-input").val().trim();
//   $("#search-input").val("");
//   addHistoryItem(city);
//   showCityWeather(city);
// }

// function handleHistoryItemClick(event) {
//   if (event.target.matches("button")) {
//     showCityWeather($(event.target).attr(historyDataCityAttr));
//   }
// }

// function renderHistory() {
//   var searchHistory = $("#search-history").empty();
//   history.forEach((city) => {
//     var btn = $("<button>").addClass(historyBtnBsClasses);
//     btn.attr(historyDataCityAttr, city);
//     btn.text(city);
//     searchHistory.append(btn);
//   });
// }

// function GoodStartIndex(response) {
//   var list = response.list;
//   var startIndex = 8;
//   do {
//     startIndex--;
//     indexHour = parseInt(moment(list[startIndex].dt * 1000).format("H"));
//   } while (indexHour >= 15 && startIndex > 0);

//   return startIndex;
// }

// function getUVColorStyle(uvIndex) {
//   if (uvIndex <= 3) {
//     return "background-color: green; color: white";
//   } else if (uvIndex <= 7) {
//     return "background-color: orange; color: white";
//   } else if (uvIndex <= 10) {
//     return "background-color: red; color: white";
//   } else {
//     return "background-color: purple; color white";
//   }
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

// function getweatherIconURL(iconCode) {
//   return "https://openweathermap.org/img/w/" + iconCode + ".png";
// }
