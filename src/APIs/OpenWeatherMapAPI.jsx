import React, { useState, useEffect } from 'react';

const Weather = () => {
    //State to store the city selection
    const [city, setCity] = useState(null);

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
            const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
            console.log(apiKey); 
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            console.log(url);
            //const url = `https://api.openweathermap.org/data/2.5/weather?forecast?Id=524901&appid=${apiKey}&units=metric`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Weather data not found.');
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
        if (e.target.value === 'DEFAULT') {
            return;
        } else { setCity(e.target.value); }
        return;
    }

    // Example useEffect to fetch weather for a default city on mount
    useEffect(() => {
        fetchWeather(city); // Fetch weather for London as default
    }, [city]); // Empty dependency array means this effect runs once on mount

    // Render the component
    return (
    <div>
        {city && <h1>{city}</h1> || <h2>Select City</h2>}
        <select 
            value={city || 'DEFAULT'}
            onChange={handleChange}
            >
            <option value="DEFAULT" disabled>Select a city</option>
            <option value="London">London</option>
            <option value="Tampa">Tampa</option>
            <option value="Minneapolis">Minneapolis</option>
            <option value="Saint Paul">Saint Paul</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="San Francisco">San Francisco</option>
        </select>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {weather && (
        <div>
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
