import { CACHE_KEY } from "../src/constants/localStorage";
import { IWeatherData } from "../src/types/weather";
import {
  deleteExpiredCache,
  getCacheData,
  setCacheData,
} from "../src/utils/api";

beforeEach(() => localStorage.clear());

test("successfuly cache data", () => {
  const mockValue = `51.5073219_-0.1276474`;
  const now = Date.now();

  const mockWeatherData: IWeatherData = {
    name: "London",
    dt: 1743751627,
    main: { temp: 284.63 },
    weather: [{ description: "overcast clouds", icon: "04d" }],
    timestamp: now,
  };

  setCacheData(mockWeatherData, mockValue);
  const result = JSON.parse(localStorage.getItem(CACHE_KEY)!);

  expect(result[mockValue]).toStrictEqual(mockWeatherData);
});

test("gets valid cache", () => {
  const mockValue = `51.5073219_-0.1276474`;
  const now = Date.now();

  const mockWeatherData: IWeatherData = {
    name: "London",
    dt: 1743751627,
    main: { temp: 284.63 },
    weather: [{ description: "overcast clouds", icon: "04d" }],
    timestamp: now,
  };

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      [mockValue]: mockWeatherData,
    })
  );

  const result = getCacheData(mockValue);

  expect(result).toStrictEqual(mockWeatherData);
});

test("removes expired cache", () => {
  const mockValue = `51.5073219_-0.1276474`;
  const expiredTimestamp = Date.now() - 20 * 60 * 1000;

  const mockWeatherData: IWeatherData = {
    name: "London",
    dt: 1743751627,
    main: { temp: 284.63 },
    weather: [{ description: "overcast clouds", icon: "04d" }],
    timestamp: expiredTimestamp,
  };

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      [mockValue]: mockWeatherData,
    })
  );

  const result = deleteExpiredCache();

  expect(result).toStrictEqual(null);
});
