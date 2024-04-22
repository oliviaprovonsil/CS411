require('dotenv').config();
const axios = require('axios');

const city = "London";
const limit = "1";
const apiKeyOpenWeather = process.env.WEATHER_API_KEY;

// Find latitude and longitude of location
const urlLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKeyOpenWeather}`;

axios.get(urlLocation)
  .then(response => {
    const dataLocation = response.data;
    const lat = dataLocation[0].lat;
    const lon = dataLocation[0].lon;

    // Find weather of location using latitude and longitude
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyOpenWeather}&units=imperial`;

    axios.get(urlWeather)
      .then(response => {
        const dataWeather = response.data;
        const conditions = dataWeather.weather[0].main;
        const feelsLikeFahrenheit = dataWeather.main.feels_like;

        // Determine event type based on weather conditions
        let term = "";
        if (["Clouds", "Rain", "Snow", "Thunderstorm", "Drizzle"].includes(conditions) || feelsLikeFahrenheit < 55) {
          term = "indoor";
        } else {
          term = "outdoor";
        }

        // Find events near latitude and longitude based on weather conditions
        const apiKeyYelp = process.env.YELP_API_KEY;
        const urlTravel = `https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${lat}&longitude=${lon}`;

        const config = {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKeyYelp}`
          }
        };

        axios.get(urlTravel, config)
          .then(response => {
            const dataTravel = response.data;
            dataTravel.businesses.forEach(business => {
              console.log(business.name);
            });
          })
          .catch(err => console.error('Error with Yelp API:', err));
      })
      .catch(err => console.error('Error with Weather API:', err));
  })
  .catch(err => console.error('Error with Location API:', err));
