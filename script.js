/* /*  $(document).ready(function () {
    // API key from OpenWeatherMap
    const apiKey = '70a5b8a3f08de77e5e2cf1e576ea39ed';
     // Get city name from the input
    const cityName = $('#search-input').val();

    // Event listener for the form click button
    //Line 9 simply says, when you click the '#search-btn', call the function 'e'
    $('#search-btn').click(function (e) {
      e.preventDefault(); // prevent default
       //console.log(e);
     
      // Call the OpenWeatherMap Geocoding API to get coordinates based on the city name
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
        )
        .then((response) => {
            
            const datadets = (JSON.stringify(response.data));
            console.log(datadets);
          // Extract coordinates from the API response
          const coordinates = response.data.coord;
        console.log(coordinates);
       // return response.json;
          // Call the OpenWeatherMap 5 Day Forecast API to get weather data based on coordinates
          return axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`
          );
        })
        .then((forecastResponse) => {
          // Display 5-day weather forecast
          displayForecast(forecastResponse.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    });

    // Function to display 5-day weather forecast
    function displayForecast(forecastData) {
      const forecastContainer = $('#forecast');
      forecastContainer.empty();

      // Loop through the forecast data and display relevant information
      forecastData.list.forEach((forecast) => {
        const dateTime = forecast.dt_txt;
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;

        // Display the forecast information
        const forecastHtml = `
            <p>${dateTime}</p>
            <p>Temperature: ${temperature} K</p>
            <p>Description: ${description}</p>
        `;
        forecastContainer.append(forecastHtml);
      });
    }
  });
 */
  const cityInput = document.querySelector("#city-input");
  const searchButton = document.querySelector("#search-btn");
  const currentWeatherDiv = document.querySelector(".current-weather");
  const daysForecastDiv = document.querySelector(".days-forecast");
  
  const API_KEY = "70a5b8a3f08de77e5e2cf1e576ea39ed"; // Paste your API here
  
  // Create weather card HTML based on weather data
  const createWeatherCard = (cityName, weatherItem, index) => {
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
                      <div class="card border-0 bg-secondary text-white">
                          <div class="card-body p-3 text-white">
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
  const getWeatherDetails = (cityName, latitude, longitude) => {
      const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  
      fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
          const forecastArray = data.list;
          const uniqueForecastDays = new Set();
  
          const fiveDaysForecast = forecastArray.filter(forecast => {
              const forecastDate = new Date(forecast.dt_txt).getDate();
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
  }
  
  // Get coordinates of entered city name
  const getCityCoordinates = () => {
      const cityName = cityInput.value.trim();
      if (cityName === "") return;
      const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
      fetch(API_URL).then(response => response.json()).then(data => {
          if (!data.length) return alert(`No coordinates found for ${cityName}`);
          const { lat, lon, name } = data[0];
          getWeatherDetails(name, lat, lon);
      }).catch(() => {
          alert("An error occurred while fetching the coordinates!");
      });
  }
  
  searchButton.addEventListener("click", () => getCityCoordinates());