"use client";
import React, { useState } from "react";

//assign types to values in WeatherData
interface WeatherData  {
  temp: number;
  forecast: string;
  humidity: number;
  windSpeed: number;
}
//Create functional Component
const Weather: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

 
   //event param with the type React.ChangeEvent<HTMLInputElement>
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //gets input of value that triggered event and sets city to this value by using "setCity"
    setCity(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //prevents default behaviour, without this state may be reset when reloading and then user input possibly lost 
    event.preventDefault();
    console.log("City:", city);

    const apiToken = "f5c63fdf53067aee3fa13c7e1efc0b7f";
    let apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiToken}`;

    const response = await fetch(apiURL, { cache: "no-store" });
    const jsonData = await response.json();

    const weather: WeatherData = {
      temp: jsonData.main.temp,
      forecast: jsonData.weather[0].description,
      humidity: jsonData.main.humidity,
      windSpeed: jsonData.wind.speed,
    };

    setWeatherData(weather);
  };

  const kelvinToCelsius = (temp: number): number => {
    return temp - 273.15;
  };

  return (
    <div className="flex justify-center items-center mt-2.5">
      <div className="  card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Weather App!</h2>
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              className="input input-bordered w-half max-w-xs m-2.0"
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city name"
            />
            <div className="card-actions">
              <button type="submit" className={"btn btn-primary m-1.5"}>
                Search
              </button>
            </div>
          </form>
          {weatherData && (
            <div>
              <h2 className="font-bold">Weather Details:</h2>
              <ul>
                <li>Forecast: {weatherData.forecast}</li>
                <li>
                  Temperature: {kelvinToCelsius(weatherData.temp).toFixed(2)} C
                </li>
                <li>Wind Speed: {weatherData.windSpeed} m/s</li>
                <li>Humidity: {weatherData.humidity} %</li>
              </ul>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Weather;
