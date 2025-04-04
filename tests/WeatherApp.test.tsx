import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WeatherApp from "../src/components/WeatherApp/WeatherApp"; // adjust path as needed
import axios from "axios";
import '@testing-library/jest-dom';


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("WeatherApp component", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  //   localStorage.clear();
  // });

  test('renders city input', () => {
    render(<WeatherApp />);
    expect(screen.getByPlaceholderText(/city/i)).toBeInTheDocument();
  });

//  test("displays an error if entered city do not exist", async () => {
//     mockedAxios.get.mockResolvedValueOnce({ data: [] });

//     render(<WeatherApp />);

//     fireEvent.change(screen.getByPlaceholderText(/city/i), {
//       target: { value: "InvalidCity" },
//     });

//     fireEvent.click(screen.getByText(/get weather/i)); // or your button text

//     await waitFor(() => {
//       expect(screen.getByText(/no such city/i)).toBeInTheDocument();
//     });
//   });
});
 