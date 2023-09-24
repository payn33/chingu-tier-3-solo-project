import { geocodeConfig } from "../utils/config";
import { request } from "https";
import { geocodeResponse } from "../types";

export const getCoordinates = async (
  city: string,
  state: string
): Promise<geocodeResponse | { error: string }> => {
  const { options } = geocodeConfig(city, state);

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
