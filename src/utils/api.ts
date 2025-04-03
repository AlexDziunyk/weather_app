import { IWeatherData } from "../types/weather";

export const formatWeatherData = (data: IWeatherData) => {
  const formattedData = {
    name: data.name,
    dt: data.dt,
    main: {
      temp: data.main.temp,
    },
    weather: [
      {
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      },
    ],
  };

  return formattedData;
};
