import React, { useState, useEffect } from "react";
import "./OpenWeatherMapApi.css";

const Weather = () => {
    const [city, setCity] = useState(null);
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timesUp, setTimesUp] = useState(false);

    const fetchWeather = async (city) => {
        setError(null);
        try {
            const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Weather data not found.");
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        if (e.target.value === "DEFAULT") {
            return;
        } else {
            setCity(e.target.value);
        }
    };

    useEffect(() => {
        setError(null);
        setWeather(null);
        setTimesUp(false);
        let timer;
        if (city != null) {
            setIsLoading(true);
            timer = setTimeout(() => {
                fetchWeather(city);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [city]);

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
                <p className="error">{error}</p>
            </div>
        );
    }

    return (
        <div className="weather-card">
            <div className="weather-card-header">
                <div className="header-selector">
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
                {weather && !isLoading && (
                    <div className="weather-icon">
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                            alt={weather.weather[0].description}
                        />
                    </div>
                )}
            </div>
            {isLoading && <div className="loader"></div>}
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
