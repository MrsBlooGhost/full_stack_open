import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getCapitalWeather = (lat, lon) => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(response => response.data);
}

export default { getCapitalWeather };
