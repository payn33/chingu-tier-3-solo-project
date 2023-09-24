import { RequestOptions, request } from "https";
import { openweatherConfig } from "../utils/config";
import { openweatherResponse } from "../types";

export const getWeatherData = async (
  lat: string,
  lng: string,
  unit: string
): Promise<openweatherResponse | { cod: number; message: string }> => {
  const { options } = openweatherConfig(lat, lng, unit);

  return new Promise((resolve, reject) => {
    const req = request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.end();
  });
};
