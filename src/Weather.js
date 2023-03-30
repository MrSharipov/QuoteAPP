import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const getWeather = async (e) => {
    e.preventDefault();
    const API_KEY = '174ca642f1ca181b047e9a7d8a8e43ba';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={getWeather}>
        <input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
        <button type="submit">Get weather</button>
      </form>
      {weatherData && (
        <div>
          <h1>{weatherData.name}</h1>
          <p>Temperature: {weatherData.main.temp }°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
