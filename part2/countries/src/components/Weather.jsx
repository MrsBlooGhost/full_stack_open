import { useState, useEffect } from 'react';
import weatherService from '../services/weather'

const Weather = ({ capital, capitalCoordinates}) => {
  const [weather, setWeather ] = useState(null);
  const [ lat, long ] = capitalCoordinates;

  useEffect(() => {
    weatherService
      .getCapitalWeather(lat, long)
      .then(data => setWeather(data))
  }, []);

  return (
    <>
      <h2>Weather in {capital}</h2>
      {weather && <p>Temperature: {weather.main.temp} Kelvin</p>}
      {weather && <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />}
      {weather && <p>Wind: {weather.wind.speed} m/s</p>}
    </>
  )

}

export default Weather;