# Weather App (~1 Hour Build)

This Weather App is a React-based application that allows users to view the current weather information for a specified city. It utilizes the OpenWeatherMap API to fetch weather details such as temperature, humidity, wind speed, and a general description of the current weather conditions.

![alt text]([../public/WeatherAppScreenShot.png](https://raw.githubusercontent.com/AnthonyDampier/weatherappdashboard/master/public/WeatherAppScreenShot.png))

## Features

- **Search Functionality:** Users can enter a city name to retrieve and display its current weather information.
    * was unable to get to in the hour time; went with selector.
- **Display Weather Information:** The app shows details like temperature, humidity, wind speed, and weather conditions.
- **Error Handling:** Provides user feedback for unsuccessful search attempts, such as invalid city names or issues with the API request.
- **Responsive Design:** Designed to be visually appealing and functional on devices of various sizes.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Download [here](https://nodejs.org/en/download/))
- A package manager like npm (comes with Node.js) or Yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AnthonyDampier/weatherappdashboard.git
   cd weather-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or if you use Yarn
   yarn install
   ```

3. **Set up the OpenWeatherMap API Key:**

   - Sign up for an API key at [OpenWeatherMap](https://openweathermap.org/api).
   - Create a `.env` file in the root of your project.
   - Add your API key to the `.env` file as follows:
     ```
     REACT_APP_WEATHER_API_KEY=your_api_key_here
     ```
   - Ensure you replace `your_api_key_here` with your actual OpenWeatherMap API key.

4. **Start the development server:**

   ```bash
   npm start
   # or if you use Yarn
   yarn start
   ```

   This will launch the app in your browser. If it doesn't automatically open, visit [http://localhost:3000](http://localhost:3000).

## Usage

- The application will initially display the weather information for London as the default city.
- To check the weather for a different city, modify the `fetchWeather` function call within `useEffect` in `Weather.js` to use your desired city, or implement a search input field for dynamic queries.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or create an issue for any enhancements, bug fixes, or features.

## License

This project is open source and available under the [MIT License](LICENSE.md).
