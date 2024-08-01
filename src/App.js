import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const fetchWeather = async () => {
    try {
      const apiKey = 'e03100a3a2d2366fdd1fa8b0eb0b4b08';
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`);
      setWeather(weatherResponse.data);
      console.log(weatherResponse.data);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`);
      setForecast(forecastResponse.data);
      console.log(forecastResponse.data);
      setCity('');
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg my-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Aplicación del clima</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
            placeholder="Ingresa la ciudad"
          />
          <button onClick={fetchWeather} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
            Buscar
          </button>
        </div>
        {weather && (
          <div>
            <h2 className="text-2xl font-bold mt-5 mb-3">{weather.name}</h2>
            <p><span className='font-bold'>Temperatura:</span> {weather.main.temp} °C</p>
            <p><span className='font-bold'>Condición: </span> {weather.weather[0].description}</p>
            <p><span className='font-bold'>Humedad: </span> {weather.main.humidity} %</p>
            <p><span className='font-bold'>Velocidad del viento: </span> {weather.wind.speed} m/s</p>
          </div>
        )}
        {forecast && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Pronóstico del clima</h2>
            <div className="flex flex-col p-x-10 justify-center">
              {forecast.list.slice(0, 8).map((forecastItem, index) => (
                <div key={index} className="p-4 bg-gray-200 rounded mb-3">
                  <p className='font-bold'>{new Date(forecastItem.dt * 1000).toLocaleString("es-CO")}</p>
                  <p><span className='font-bold'>Temperatura: </span> {forecastItem.main.temp} °C</p>
                  <p><span className='font-bold'>Condicion: </span> {forecastItem.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
