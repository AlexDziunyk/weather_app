import { Anchor, Card, Group, Image, Text } from "@mantine/core";
import { IWeatherData } from "../../types/weather";
import classes from "./WeatherItem.module.css";
import { convertToCelsius } from "../../utils/calculations";
import { formatDate } from "../../utils/date";

interface WeatherItemProps {
  data: IWeatherData;
}

const WeatherItem = ({ data }: WeatherItemProps) => {
  return (
    <Card withBorder shadow="sm" mt={"lg"}>
      <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
        Updated: {formatDate(data.dt)}
      </Anchor>
      <Card.Section>
        <Image
          h={100}
          src={`https://rodrigokamada.github.io/openweathermap/images/${data.weather[0].icon}_t.png`}
          alt="weather_icon"
          w="auto"
          fit="contain"
        />
      </Card.Section>
      <Group justify="space-between">
        <Text fz="lg" fw={700} mt={0}>
          {data.name}
        </Text>
        <Text fz="xs" c={"dimmed"} mt={0}>
          {data.weather[0].description}
        </Text>
      </Group>
      <Card.Section className={classes.footer}>
        <div>
          <Text size="sm" c="dimmed">
            Temperature
          </Text>
          <Text fw={500} size="m">
            {convertToCelsius(data.main.temp)} &#8451;
          </Text>
        </div>
      </Card.Section>
    </Card>
  );
};

export default WeatherItem;
