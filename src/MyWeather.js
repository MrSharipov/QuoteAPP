import React, { useState } from "react";
import axios from "axios";

const MyWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "174ca642f1ca181b047e9a7d8a8e43ba";
  const [cityName, setCityName] = useState("");

  async function searchData(e) {
    e.preventDefault();
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    );
    setWeatherData(result.data);
    setCityName("");
  }
  return (
    <>
      <form onSubmit={searchData}>
        <label htmlFor="city">City name</label>
        <input
          type="text"
          id="city"
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
      {weatherData ? (
        <div className="card">
          <h1>{weatherData.name}</h1>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="icon"
            width={100}
          />
          <h3>{weatherData.weather.main}</h3>
          <h4>Temprature: {Math.floor(weatherData.main.temp - 273.15)} C</h4>
          <h5>Humidity: {weatherData.main.humidity}%</h5>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <>
          <h1>I am weather APP</h1>
          <img
            src="https://cdn.jim-nielsen.com/ios/512/weather-2021-12-07.png"
            alt="say"
          />
        </>
      )}
    </>
  );
};

export default MyWeather;
