export const convertToCelsius = (temp: number) => {
  return ((temp - 32) / 1.8).toFixed(1);
};
