import WeatherApp from "./components/WeatherApp/WeatherApp";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <WeatherApp />
    </MantineProvider>
  );
}

export default App;
