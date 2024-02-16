import React, { useState, useEffect } from 'react';

const Weather = () => {
    // State to store the weather data
    const [weather, setWeather] = useState(null);
    // State to store the loading status
    const [isLoading, setIsLoading] = useState(false);
    // State to store any error message
    const [error, setError] = useState(null);

    // Function to fetch weather data
    const fetchWeather = async (city) => {
        setIsLoading(true);
        setError(null);
        try {
            const apiKey = process.env.WEATHER_API_KEY; // Reference the API key from the environment file 
            console.log(apiKey);           
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Weather data not found.');
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Example useEffect to fetch weather for a default city on mount
    useEffect(() => {
        fetchWeather('London'); // Fetch weather for London as default
    }, []); // Empty dependency array means this effect runs once on mount

    // Render the component
    return (
    <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {weather && (
        <div>
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} km/h</p>
            <p>Description: {weather.weather[0].description}</p>
        </div>
        )}
    </div>
    );
};

export default Weather;
