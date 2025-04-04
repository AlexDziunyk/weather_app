import { Container } from "@mantine/core";
import axios from "axios";
import CitiesAutocomplete from "../CitiesAutocomplete/CitiesAutocomplete";
import { useState } from "react";
import { IWeatherData } from "../../types/weather";
import WeatherItem from "../WeatherItem/WeatherItem";
import classes from "./WeatherApp.module.css";
import ErrorText from "../ErrorText/ErrorText";
import { setCacheData, getCacheData } from "../../utils/api";
import { MantineProvider } from "@mantine/core";
const Weather = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const fetchWeather = async (value: string) => {
    try {
      const cache = getCacheData(value);
      if (cache) {
        setWeatherData(cache);
        return;
      }

      const [lat, lon] = value.split("_");
      const { data }: { data: IWeatherData } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_WEATHER_API
        }`
      );

      setCacheData(data, value);
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
    <MantineProvider>
      <Container size={"sm"} mt={"xl"}>
        <h1>Weather App</h1>
        <CitiesAutocomplete onSubmit={fetchWeather} />
        {error && <ErrorText text={error} />}
        <div className={classes.container}>
          {weatherData && <WeatherItem data={weatherData} />}
        </div>
      </Container>
    </MantineProvider>
  );
};

export default Weather;
