import { writeFile, existsSync, appendFile } from "fs";
import { join, resolve } from "path";
import { errorResponse } from "./formatConsoleResponses";

export const writeToTxtFile = (data: string) => {
  const rootDir = resolve(__dirname, "..");
  const filePath = join(rootDir, "utils", "weather.txt");
  const fileExists = existsSync(filePath);

  if (fileExists) {
    appendFile(filePath, data, (err) => {
      if (err) return errorResponse(err.name, err.message);

      return console.log(
        "\n Weather data has been added to your weather tracking file, weather.txt."
      );
    });
  } else {
    writeFile(filePath, data, (err) => {
      if (err) return errorResponse(err.name, err.message);

      return console.log(
        "\n Weather data has been added to your weather tracking file, weather.txt."
      );
    });
  }
};

export const writeToEnvFile = (
  key: "OPEN_WEATHER_API_KEY" | "LOCATION_IQ_API_KEY",
  value: string
) => {
  const rootDir = resolve(__dirname, "../..");
  const filePath = join(rootDir, ".env");
  const fileExists = existsSync(filePath);

  if (fileExists) {
    appendFile(filePath, `\n${key}=${value}`, (err) => {
      if (err) return errorResponse(err.name, err.message);

      return console.log(`\n Variable ${key} has been added successfully.`);
    });
  } else {
    writeFile(filePath, `\n${key}=${value}`, (err) => {
      if (err) return errorResponse(err.name, err.message);

      return console.log(`\n Variable ${key} has been added successfully.`);
    });
  }
};
