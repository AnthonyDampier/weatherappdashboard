import React, { useState, useEffect } from "react";
import "./OpenWeatherMapApi.css";

const Weather = () => {
  //State to store the city selection
  const [city, setCity] = useState(null);

  // State to store the weather data
  const [weather, setWeather] = useState(null);
  // State to store the loading status
  const [isLoading, setIsLoading] = useState(false);
  // State to store any error message
  const [error, setError] = useState(null);
  // State to store the timesUp status
  const [timesUp, setTimesUp] = useState(false);

  // Function to fetch weather data
  const fetchWeather = async (city) => {
    setError(null);
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      console.log(apiKey);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
      console.log(url);
      //const url = `https://api.openweathermap.org/data/2.5/weather?forecast?Id=524901&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Weather data not found.");
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "DEFAULT") {
      return;
    } else {
      setCity(e.target.value);
    }
    return;
  };

  useEffect(() => {
    setError(null);
    setWeather(null);
    setTimesUp(false);
    // set timer to update timesUp after 2 second requesting weather data
    let timer;
    if (city != null){
        setIsLoading(true);
        timer = setTimeout(() => {
        fetchWeather(city);
        }, 2000);
    };
    // Cleanup func to clear the timer; if timer unmounts before 2 seconds
    return () => clearTimeout(timer);
  }, [city]); // Empty dependency array means this effect runs once on mount

  // Render the component
  if (error) {
    return (
      <div className="weather-card">
        {(city && <h2>{city}</h2>) || <h2>Select City</h2>}
        <select value={city || "DEFAULT"} onChange={handleChange}>
          <option value="DEFAULT" disabled>
            Select a city
          </option>
          <option value="London">London</option>
          <option value="Tampa">Tampa</option>
          <option value="Minneapolis">Minneapolis</option>
          <option value="Saint Paul">Saint Paul</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="San Francisco">San Francisco</option>
        </select>
        <p className='error'>{error}</p>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div className='header-selector'>
            {(city && <h2>{city}</h2>) || <h2>Select City</h2>}
            <select value={city || "DEFAULT"} onChange={handleChange}>
                    <option value="DEFAULT" disabled>
                    Select a city
                    </option>
                    <option value="London">London</option>
                    <option value="Tampa">Tampa</option>
                    <option value="Minneapolis">Minneapolis</option>
                    <option value="Saint Paul">Saint Paul</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="San Francisco">San Francisco</option>
            </select>
        </div>
        {/* <div className="weather-icon">
            <div className="img-placeholder">🌨</div>
        </div> */}
        {weather && !isLoading && (
          <div className="weather-icon">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          </div>
        )}
      </div>
      {isLoading && <div class="loader"></div>}
      {weather && !isLoading && (
        <div>
          <p className="temperature">{weather.main.temp}°F</p>
          <div className="weather-detail">
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
          <div className="weather-detail">
            <p>Wind Speed: {weather.wind.speed} km/h</p>
          </div>
          <div className="weather-detail">
            <p>Description: {weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
