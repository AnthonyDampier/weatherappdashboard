import './App.css';
import Weather from './APIs/OpenWeatherMapAPI';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Weather/>
      </header>
    </div>
  );
}

export default App;
