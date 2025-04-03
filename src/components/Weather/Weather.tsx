import { Container } from "@mantine/core";
import axios from "axios";
import CitiesAutocomplete from "../CitiesAutocomplete/CitiesAutocomplete";
import { useState } from "react";
import { IWeatherData } from "../../types/weather";
import WeatherItem from "../WeatherItem/WeatherItem";
import classes from "./Weather.module.css";
import ErrorText from "../ErrorText/ErrorText";
import { CACHE_KEY } from "../../constants/localStorage";
import { formatWeatherData } from "../../utils/api";

const Weather = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const fetchWeather = async (value: string) => {
    try {
      const cache = localStorage.getItem(CACHE_KEY);

      if (cache) {
        const cacheValue = JSON.parse(cache);
        if (cacheValue[value]) {
          setWeatherData(cacheValue[value]);
          return;
        }
      }

      const [lat, lon] = value.split("_");
      const { data }: { data: IWeatherData } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_WEATHER_API
        }`
      );

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          ...JSON.parse(cache ?? "{}"),
          [value]: { ...formatWeatherData(data) },
        })
      );
      setWeatherData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong!");
      }
      console.error(error);
    }
  };

  return (
    <Container size={"sm"} mt={"xl"}>
      <h1>Weather App</h1>
      <CitiesAutocomplete onSubmit={fetchWeather} />
      {error && <ErrorText text={error} />}
      <div className={classes.container}>
        {weatherData && <WeatherItem data={weatherData} />}
      </div>
    </Container>
  );
};

export default Weather;
