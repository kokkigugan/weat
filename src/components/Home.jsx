import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home() {
  // State to manage the search query and weather data
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });

  // Function to handle the search when the Enter key is pressed
  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setQuery(""); // Clear the query input
      setWeather({ ...weather, loading: true }); // Set loading state

      // API key and URL for weather data
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

      try {
        const res = await axios.get(url);
        setWeather({ data: res.data, loading: false, error: false }); // Set weather data
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true }); // Handle error
        console.log("error", error);
      }
    }
  };

  // Fetch default weather data for Rabat on component mount
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=Rabat&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Weather App</h1>
      <SearchEngine query={query} setQuery={setQuery} search={search} />
      {weather.loading && <div className="mt-4">Searching..</div>}
      {weather.error && (
        <div className="mt-4">
          <span className="error-message">
            Sorry, city not found. Please try again.
          </span>
        </div>
      )}
      {weather.data.condition && <Forecast weather={weather} />}
    </div>
  );
}

export default Home;
