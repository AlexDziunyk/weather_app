export interface IWeatherCity {
  name: string;
  lat: number;
  lon: number;
  state: string;
  country: string;
}

export interface IWeatherData {
  name: string;
  dt: number;
  main: {
    temp: number;
  };
  weather: { description: string; icon: string }[];
  timestamp?: number;
}

export interface IWeatherCache {
  [key: string]: IWeatherData;
}
