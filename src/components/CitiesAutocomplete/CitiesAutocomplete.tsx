import { Autocomplete, Loader, OptionsFilter } from "@mantine/core";
import { useRef, useState } from "react";
import { IWeatherCity } from "../../types/weather";
import axios from "axios";
import ErrorText from "../ErrorText/ErrorText";

interface CitiesAutocompleteProps {
  onSubmit: (value: string) => void;
}

const CitiesAutocomplete = ({ onSubmit }: CitiesAutocompleteProps) => {
  const [cityName, setCityName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [citiesArr, setCitiesArr] = useState<IWeatherCity[]>([]);
  const timeoutRef = useRef<number>(-1);
  const [error, setError] = useState<string>("");

  const fetchCitiesList = async (value: string) => {
    try {
      const { data }: { data: IWeatherCity[] } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${
          import.meta.env.VITE_WEATHER_API
        }`
      );

      setLoading(false);
      setCitiesArr(data);
      console.log(data);
      if (data.length === 0) {
        throw new Error("There is no such city. Please, try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong!");
      }
      console.error(error);
    }
  };

  const handleAutocompleteChange = (value: string) => {
    clearTimeout(timeoutRef.current);
    setCityName(value);
    setError("");
    setCitiesArr([]);

    if (value.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    timeoutRef.current = window.setTimeout(() => {
      fetchCitiesList(value);
    }, 1000);
  };

  const optionsFilter: OptionsFilter = ({ options }) => {
    return options.map((item) => item);
  };

  return (
    <>
      <Autocomplete
        value={cityName}
        filter={optionsFilter}
        onOptionSubmit={onSubmit}
        data={citiesArr.map((item) => {
          return {
            value: `${item.lat}_${item.lon}_${item.name}`,
            label: `${item.name},${item.state ? ` ${item.state}` : ""} ${
              item.country
            }`,
          };
        })}
        onChange={handleAutocompleteChange}
        rightSection={loading ? <Loader size={20} /> : null}
        label={"Enter city name, please"}
        placeholder={"City"}
      />
      {error && <ErrorText text={error} />}
    </>
  );
};

export default CitiesAutocomplete;
