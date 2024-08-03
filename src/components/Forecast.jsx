import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/forecast?query=${data.city}&key=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setForecastData(response.data.daily);
      } catch (error) {
        console.log("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data.city]);

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isCelsius) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };

  const defaultSize = 40;

  return (
    <div className="mt-8 p-4 bg-white bg-opacity-80 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          {data.city}, <span className="text-xl">{data.country}</span>
        </h2>
        <div className="text-gray-500">{new Date().toLocaleDateString()}</div>
      </div>
      {windowWidth < 300 ? (
        <div className="flex justify-center items-center mt-4">
          <div className="text-6xl font-bold">
            {renderTemperature(data.temperature.current)}
            <sup
              className="text-2xl cursor-pointer"
              onClick={toggleTemperatureUnit}
            >
              {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
            </sup>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center md:flex-row md:justify-center mt-4">
            {data.condition.icon_url && (
              <img
                src={data.condition.icon_url}
                alt={data.condition.description}
                className="w-20 h-20"
              />
            )}
            <div className="text-6xl font-bold md:ml-4">
              {renderTemperature(data.temperature.current)}
              <sup
                className="text-2xl cursor-pointer"
                onClick={toggleTemperatureUnit}
              >
                {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
              </sup>
            </div>
          </div>
          <p className="text-center text-gray-500">{data.condition.description}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col items-center">
              <ReactAnimatedWeather icon="WIND" size={defaultSize} />
              <p>{data.wind.speed} m/s</p>
              <p className="text-sm text-gray-500">Wind speed</p>
            </div>
            <div className="flex flex-col items-center">
              <ReactAnimatedWeather icon="RAIN" size={defaultSize} />
              <p>{data.temperature.humidity}%</p>
              <p className="text-sm text-gray-500">Humidity</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold">5-Day Forecast:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {forecastData &&
                forecastData.slice(0, 5).map((day) => (
                  <div className="text-center" key={day.time}>
                    <p>{formatDay(day.time)}</p>
                    {day.condition.icon_url && (
                      <img
                        className="w-12 h-12 mx-auto"
                        src={day.condition.icon_url}
                        alt={day.condition.description}
                      />
                    )}
                    <p>
                      {Math.round(day.temperature.minimum)}°/
                      <span>{Math.round(day.temperature.maximum)}°</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Forecast;
