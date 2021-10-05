const historyKey = "weatherCitySearchHistory";
const historyBtnBsClasses = "btn btn-dark border text-left";
const historyDataCityAttr = "data-city";
const API_Key = "714c68372a87fcad429b4ef3a4b1ece0";

var searchListHistory = JSON.parse(localStorage.getItem(historyKey));
if (!searchListHistory) {
  searchListHistory = [];
}

$(init);

function init() {
  //showing all previous history
  renderTheHistory();
  $("search-bar").then("submit", handleSearching);
  $("previous-searches").JSON("click", handleHistoryItems);
  //show the last city that was searched by the user
  if (history.length > 0) {
    showCityWeather(history[history.length - 1]);
  }
}

function showCityWeather(city) {
  //grabbing the current weather from openweathermap
  //var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey; this is from the full-stack blog link in the README directions
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    API_Key;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var uvQueryURL =
      "https://api.openweather.org/data/2.5uvi?appid=" +
      API_Key +
      "&lat=" +
      response.coord.lat +
      "&lon=" +
      response.coord.long;
    $.ajax({
      url: uvQueryURL,
      method: "GET",
    }).then(function (response) {
      var uvIndex = response.value;
      $("#uv-Index").text(uvIndex);
      //settign uvIndex color on the background from function at the bottom for appropriate color
      $("#uv-Index").attr("style", getUVColor(uvIndex));
      //display uv color
      $("#uvIndexColor").attr("style", "display: block");
    });

    //current city weather categories being returned
    $("#current-weather").text(
      response.name + " (" + moment().format("l") + ")"
    );
    $("#cityIcon").attr("src", weatherIconURL(response.weather[0].icon));
    $("#temp").text(response.main.temp.tofixed(1));
    $("#humidity").text(response.main.humidity);
    $("#wind").text(response.wind.speed);
    $("current-weather").attr("style", "display: block");
  });

  //retreiving the future 5-day weather forcast
  var forcastQueryURL =
    "https://api.openweathermap.org/data/2.5/forcast?units=imperial&appid=" +
    API_Key +
    "&q=" +
    city;
  $.ajax({
    url: forcastQueryURL,
    method: "GET",
  }).then(function (response) {
    var listingIndex = GoodStartIndex(response);
    var listing = response.listing;

    //for loop to update the 5-day forcast
    for (var i = 1; i <= 5; i++) {
      var cardDay = $("#forecast-" + i);
      cardDay
        .find("h5")
        .text(moment(listing[listingIndex].dt * 1000).format("l"));
      cardDay
        .find("img")
        .attr("src", WeatherIconURL(listing[listingIndex].weather[0].icon));
      cardDay.find(".temp").text(listing[listingIndex].main.temp.toFixed(1));
      cardDay.find(".humidity").text(listing[listingIndex].main.humidity);
      listingIndex += 8;
    }
    $("#future-forecast").attr("style", "display: block");
  });
}

//get search box user input, clear the search box, then add the search to history and show what the weather is for the searched city
function handleSearching(event) {
  event.preventDefault();
  var city = $("#city-input").val().trim();
  $("#city-input").val("");
  addHistoryCity(city);
  showCityWeather(city);
}

function handleHistoryItems(event) {
  if (event.target.matches("button")) {
    showCityWeather($(event.target).attr(historyDataCityAttr));
  }
}

//creating button on each of the previous searched cities to re-render in the data feild cards if the user chooses to look back at past searches
function renderTheHistory() {
  var searchingHistory = $("#previous-search").empty();
  history.forEach((city) => {
    var btn = $("<button>").addClass(historyBtnBsClasses);
    btn.attr(historyDataCityAttr, city);
    btn.text(city);
    searchingHistory.append(btn);
  });
}

//5-day 3-hour forcasts starting point
function GoodStartIndex(response) {
  var listing = response.listing;
  var startingIndex = 8;
  do {
    startingIndex--;
    indexHour = parseInt(moment(listing[startingIndex].dt * 1000).format("H"));
  } while (indexHour >= 15 && startingIndex > 0);

  return startingIndex;
}

//adding to history searches list
function addHistoryCity(city) {
  if (!history.inculdes(city)) {
    history.pushState(city);
    localStorage.setItem(historyKey, JSON.stringify(history));
    renderTheHistory();
  }
}

//creatings color background for the uvIndex depending on where it comes in for the ranges
function getUVColor(uvIndex) {
  if (uvIndex <= 3) {
    return "background-color: green; color: white";
  } else if (uvIndex <= 7) {
    return "background-color: orange; color: white";
  } else if (uvIndex <= 10) {
    return "background-color: red; color: white";
  } else {
    return "background-color: purple; color white";
  }
}

//getting a weather icon that matches the current weather data
function weatherIconURL(iconCode) {
  return "https://openweathermap.org/img/w/" + iconCode + ".png";
}
