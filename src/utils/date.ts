export const formatDate = (dt: number) => {
  const date = new Date(dt * 1000);

  return date.toLocaleString();
};
