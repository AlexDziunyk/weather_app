import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, vi, beforeEach, expect } from "vitest";
import { MantineProvider } from "@mantine/core";
import WeatherApp from "../src/components/WeatherApp/WeatherApp";
import axios from "axios";
import { convertToCelsius } from "../src/utils/calculations";
import { formatDate } from "../src/utils/date";

const renderWithMantine = (ui: React.ReactNode) =>
  render(<MantineProvider>{ui}</MantineProvider>);

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("WeatherApp component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("displays an error if city is incorrect", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    renderWithMantine(<WeatherApp />);
    const input = screen.getByPlaceholderText(/City/i);

    fireEvent.change(input, { target: { value: "Lond12s2s" } });
    fireEvent.blur(input);

    await waitFor(() =>
      expect(
        screen.getByText(/There is no such city. Please, try again./i)
      ).toBeInTheDocument()
    );
  });

  test("displays correct info about weather for the chosen city", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({
        data: [
          {
            name: "London",
            lat: 51.5073219,
            lon: -0.1276474,
            state: "England",
            country: "GB",
          },
        ],
      })
      .mockResolvedValueOnce({
        data: {
          name: "London",
          dt: 1743760876,
          main: { temp: 290.44 },
          weather: [{ description: "overcast clouds", icon: "04d" }],
        },
      });

    render(<WeatherApp />);

    const input = screen.getByPlaceholderText(/City/i);
    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.focus(input);

    const option = await screen.findByText(/London, England GB/i);
    fireEvent.click(option);

    const celciusTemperature = convertToCelsius(290.44);
    const datetime = formatDate(1743760876);

    await waitFor(() => {
      expect(screen.getByText(/overcast clouds/i)).toBeInTheDocument();
      expect(screen.getByText(/London/i)).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`${celciusTemperature}`, "i"))
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`${datetime}`, "i"))
      ).toBeInTheDocument();
    });
  });
});
