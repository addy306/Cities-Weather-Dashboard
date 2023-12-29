/*  $(document).ready(function () {
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
 $(document).ready(function () {
    // API key from OpenWeatherMap
    const apiKey = '70a5b8a3f08de77e5e2cf1e576ea39ed';
     // Get city name from the input
    const cityName = $('#search-input').val();

    // Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
"q=Bujumbura,Burundi&appid=" + APIKey;
  });