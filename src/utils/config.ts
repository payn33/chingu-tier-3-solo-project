import { RequestOptions } from "https";

export const geocodeConfig = (
  city: string,
  state: string
): { options: RequestOptions } => {
  const token = process.env.LOCATION_IQ_API_KEY;
  return {
    options: {
      hostname: "us1.locationiq.com",
      path: `/v1/search?key=${token}&city=${city}&state=${state}&addressdetails=1&normalizeaddress=1&format=json`,
      method: "GET",
    },
  };
};

export const openweatherConfig = (
  lat: string,
  lng: string,
  unit: string
): { options: RequestOptions } => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  return {
    options: {
      hostname: "api.openweathermap.org",
      path: `/data/2.5/onecall?lat=${lat}&lon=${lng}&units=${unit}&appid=${apiKey}`,
      method: "GET",
    },
  };
};
