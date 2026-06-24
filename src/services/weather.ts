import axios from "axios";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export const getWeather = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=${WEATHER_API_KEY}&units=metric`
    );

    return response.data;
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
};
