import React, {useState} from 'react';
import './App.css';

const api = {
  key: "48ba07cf2c2603ac36e5c3b1525d5be5",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  let [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});
  const search = env => {
    if(env.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric$&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery("");
        setWeather(result);
        console.log(result);
        
      });
    }
  }

  const dateBuilder = d =>{
    let months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
    let days = ['Sunday','Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();

    return `${day} ${date}, ${month} ${year}`
  }


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20)
    ? "App-warm" : "App"):"App"}>
      <main>
      <h3>React Weather App</h3>
        <div className="search-box">
          <input className="search-bar" placeholder="Enter a Location and Press Enter to Search..." type="text"
          onChange = {e=>setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          ></input>
        </div>
        
      {(typeof weather.main != "undefined")?
      (
        <div>
          <div className="location-box">
            <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
            {Math.round(weather.main.temp - 273)}︒C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
      ):("")
      }
      </main>
    </div>
  );
}

export default App;
