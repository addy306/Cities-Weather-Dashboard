  var cityInput = document.querySelector("#city-input");
  var searchButton = document.querySelector("#search-btn");
  var historySect = document.querySelector("#history");
  var currentWeatherDiv = document.querySelector(".current-weather");
  var daysForecastDiv = document.querySelector(".days-forecast");
  var cities = JSON.parse(localStorage.getItem("cities")) || [];

  
  var API_KEY = "70a5b8a3f08de77e5e2cf1e576ea39ed"; // This API key was gotten from openweathermap.org
  
  // This dynamically Creates weather card HTML based on weather data
  var createWeatherCard = (cityName, weatherItem, index) => {
    
      if(index === 0) {
          return `<div class="mt-3 d-flex justify-content-between">
                      <div>
                          <h3 class="fw-bold">${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h3>
                          <h6 class="my-3 mt-3">Temperature: ${((weatherItem.main.temp - 273.15).toFixed(2))}°C</h6>
                          <h6 class="my-3">Wind: ${weatherItem.wind.speed} M/S</h6>
                          <h6 class="my-3">Humidity: ${weatherItem.main.humidity}%</h6>
                      </div>
                      <div class="text-center me-lg-5">
                          <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather icon">
                          <h6>${weatherItem.weather[0].description}</h6>
                      </div>
                  </div>`;
      } else {
          return `<div class="col mb-3">
          <div class="card border border-primary bg-transparent text-black">
                          <div class="card-body p-3 text-black">
                              <h5 class="card-title fw-semibold">(${weatherItem.dt_txt.split(" ")[0]})</h5>
                              <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather icon">
                              <h6 class="card-text my-3 mt-3">Temp: ${((weatherItem.main.temp - 273.15).toFixed(2))}°C</h6>
                              <h6 class="card-text my-3">Wind: ${weatherItem.wind.speed} M/S</h6>
                              <h6 class="card-text my-3">Humidity: ${weatherItem.main.humidity}%</h6>
                          </div>
                      </div>
                  </div>`;
      }
  }
  
  // Get weather details of passed latitude and longitude
 var  getWeatherDetails = (cityName, latitude, longitude) => {
      var  WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  
      fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        console.log(data);
        //historySect.empty();
          var  forecastArray = data.list;
          var  uniqueForecastDays = new Set();
  
          var fiveDaysForecast = forecastArray.filter(forecast => {
              var  forecastDate = new Date(forecast.dt_txt).getDate();
              if (!uniqueForecastDays.has(forecastDate) && uniqueForecastDays.size < 6) {
                  uniqueForecastDays.add(forecastDate);
                  return true;
              }
              return false;
          });
  
          cityInput.value = "";
          currentWeatherDiv.innerHTML = "";
          daysForecastDiv.innerHTML = "";
  
          fiveDaysForecast.forEach((weatherItem, index) => {
              const html = createWeatherCard(cityName, weatherItem, index);
              if (index === 0) {
                  currentWeatherDiv.insertAdjacentHTML("beforeend", html);
              } else {
                  daysForecastDiv.insertAdjacentHTML("beforeend", html);
              }
          });        
      }).catch(() => {
          alert("An error occurred while fetching the weather forecast!");
      });
      // Store city in local storage
  saveToLocalStorage(cityName);
  // Display search history
  displaySearchHistory();
  }
  
  

// Save city to local storage
const saveToLocalStorage = (cityName) => {
 // let cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.unshift(cityName); // Add the new city to the beginning of the array
  cities = Array.from(new Set(cities)); // Remove duplicates
  localStorage.setItem("cities", JSON.stringify(cities));

};

// Display search history
const displaySearchHistory = () => {
    historySect.innerHTML = ""; // Clear the search history before appending new buttons
    

    cities.forEach((city) => {
        var button = document.createElement("button");
        button.classList.add("historyBtn","btn-outline-primary");
        button.textContent = city;
        historySect.appendChild(button);
    });
    var historyBtnArray = document.querySelectorAll(".historyBtn");
  for (let i = 0; i < historyBtnArray.length; i++) {
    historyBtnArray[i].addEventListener ("click", function () {
     //console.log('hello');
     //this is equal to the button clicked
     //this.textContent grabs the text content 
          console.log(this.textContent);
         var cityName = this.textContent ;
         getCityCoordinates(cityName)
    }) 
};
}
  // Get coordinates of entered city name
  var getCityCoordinates = (city) => {
      
      if (city === "") return;
      var API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    
      fetch(API_URL).then(response => response.json()).then(data => {
          if (!data.length) return alert(`No coordinates found for ${city}`);
          console.log(data[0]);
          var { lat, lon, name } = data[0];
          getWeatherDetails(name, lat, lon);
      }).catch(() => {
          alert("An error occurred while fetching the coordinates!");
      });
  }

 // $(document).on("click", ".button", getCityCoordinates);
  searchButton.addEventListener("click", () => {
    var cityName = document.querySelector('#city-input').value.trim();
    getCityCoordinates(cityName)});
  displaySearchHistory()