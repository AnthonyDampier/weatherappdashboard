import './App.css';
import React, { useState } from 'react';
//import Papa from 'papaparse'; // Import the PapaParse library
import Weather from './APIs/OpenWeatherMapAPI';

function App() {
  //const CSVReader = () => {
    // const [data, setData] = useState([]);

    // const handleOnChange = (e) => {
    //   const file = e.target.files[0];
    //   if (!file) {
    //     return;
    //   }

    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     const text = event.target.result;
    //     const rows = text.split('\n').map((row) => row.split(','));
    //     // Assuming the first row contains headers
    //     const headers = rows[0];
    //     const jsonData = rows.slice(1).map((row) => {
    //       return row.reduce((acc, cur, index) => {
    //         acc[headers[index]] = cur;
    //         return acc;
    //       }, {});
    //     });
    //     setData(jsonData);
    //   };
    //   reader.readAsText(file);
    // };

  return (
    <div className="App">
      <header className="App-header">
        {/* <div>
          <input type="file" onChange={handleFileUpload} />
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div> */}
        <Weather/>
      </header>
    </div>
  );
}
export default App;
