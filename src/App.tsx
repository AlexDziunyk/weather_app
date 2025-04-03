import Weather from "./components/Weather/Weather";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <Weather />
    </MantineProvider>
  );
}

export default App;
