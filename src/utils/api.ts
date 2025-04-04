import { CACHE_KEY, EXPIRATION_TIME } from "../constants/localStorage";
import { IWeatherData } from "../types/weather";

export const formatWeatherData = (data: IWeatherData) => {
  const formattedData = {
    timestamp: Date.now(),
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

export const getCacheData = (value: string) => {
  const cache = localStorage.getItem(CACHE_KEY);

  if (cache) {
    const cacheValue = JSON.parse(cache);
    const filteredCache = deleteExpiredCache();
    if (filteredCache && cacheValue[value]) {
      return cacheValue[value];
    }
  }

  return null;
};

export const setCacheData = (data: IWeatherData, value: string) => {
  const cache = localStorage.getItem(CACHE_KEY);

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      ...JSON.parse(cache ?? "{}"),
      [value]: { ...formatWeatherData(data) },
    })
  );
};

export const deleteExpiredCache = () => {
  const cache = localStorage.getItem(CACHE_KEY);
  if (!cache) {
    return;
  }
  const cacheValue = JSON.parse(cache);
  const now = Date.now();

  const validEntries = Object.fromEntries(
    Object.entries(cacheValue).filter(([_, value]) => {
      const entry = value as { timestamp: number };
      return now - entry.timestamp < EXPIRATION_TIME;
    })
  );

  if (Object.keys(validEntries).length === 0) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  localStorage.setItem(CACHE_KEY, JSON.stringify(validEntries));
  return validEntries;
};

