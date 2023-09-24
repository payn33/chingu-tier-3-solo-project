import {
  currentWeatherData,
  dailyWeatherData,
  geocodeResponse,
  hourlyWeatherData,
} from "../types";
import {
  cliErrorMessages,
  measurementUnits,
  openweatherResObjKeys,
} from "../utils/constants";
import cliSelect from "./displaySelect";
import { formatGeocodeRes } from "./formatApiResponses";

export const coordinatesResponse = async (
  props: geocodeResponse
): Promise<null | {
  lat: string;
  lng: string;
  location: {
    city?: string;
    state?: string;
    country?: string;
    description: string;
  };
}> => {
  if (props.length === 0) {
    console.log("\n"),
      console.log(
        "0 results, please check your location details and try again"
      );
    return null;
  } else if (props.length === 1) {
    const res = formatGeocodeRes(props);

    const { lat, lng, location } = await cliSelect(
      "Please select a location you would like to display",
      res
    );

    return {
      lat,
      lng,
      location,
    };
  } else {
    const res = formatGeocodeRes(props);

    const { lat, lng, location } = await cliSelect(
      "Please select a location you would like to display",
      res
    );

    return {
      lat,
      lng,
      location,
    };
  }
};

type OpenweatherResObjKeys =
  (typeof openweatherResObjKeys)[keyof typeof openweatherResObjKeys];

export const weatherSuccessResponse = (
  props: {
    type: OpenweatherResObjKeys;
    data: currentWeatherData | hourlyWeatherData[] | dailyWeatherData[];
  },
  location: string,
  unit: string
) => {
  const { type, data } = props;

  const tempUnit = unit === measurementUnits.METRIC.value ? "C" : "F";

  if (type === openweatherResObjKeys.CURRENT) {
    const {
      date,
      temperature: { current, feelsLike },
      condition,
      summary,
      sunrise,
      sunset,
      moonrise,
      moonset,
      pressure,
      humidity,
      dewPoint,
      uvi,
      clouds,
      visibility,
      windSpeed,
      windDeg,
      windGust,
    } = data as currentWeatherData;

    return (
      console.log("\n"),
      console.log("\x1b[34m%s\x1b[0m", date),
      console.log(
        "\x1b[34m%s\x1b[0m",
        `Current temperature in ${location} is ${current}${tempUnit}, but feels like ${feelsLike}${tempUnit} \n`
      ),
      console.log(
        "\x1b[34m%s\x1b[0m",
        `Conditions are currently: ${condition} \n`
      ),
      console.log("\x1b[34m%s\x1b[0m", `What you shoud expect: ${summary} \n`),
      console.log(
        "\x1b[34m%s\x1b[0m",
        `The sun and moon rise at ${sunrise} and ${moonrise} respectively, and set at ${sunset} and ${moonset} \n`
      ),
      (pressure ||
        humidity ||
        dewPoint ||
        uvi ||
        clouds ||
        visibility ||
        windSpeed ||
        windDeg ||
        windGust) &&
        console.log("\x1b[31m%s\x1b[0m", "Additional information"),
      pressure && console.log("\x1b[34m%s\x1b[0m", "Pressure: ", pressure),
      humidity && console.log("\x1b[34m%s\x1b[0m", "Humidity: ", humidity),
      dewPoint && console.log("\x1b[34m%s\x1b[0m", "DewPoint: ", dewPoint),
      uvi && console.log("\x1b[34m%s\x1b[0m", "Uvi: ", uvi),
      clouds && console.log("\x1b[34m%s\x1b[0m", "Clouds: ", clouds),
      visibility &&
        console.log("\x1b[34m%s\x1b[0m", "Visibility: ", visibility),
      windSpeed && console.log("\x1b[34m%s\x1b[0m", "WindSpeed: ", windSpeed),
      windDeg && console.log("\x1b[34m%s\x1b[0m", "WindDeg: ", windDeg),
      windGust && console.log("\x1b[34m%s\x1b[0m", "WindGust: ", windGust)
    );
  }

  if (type === openweatherResObjKeys.HOURLY && Array.isArray(data)) {
    console.log("\x1b[34m%s\x1b[0m", `Displaying 48hrs forecast: \n`);

    for (const ctx of data) {
      const {
        date,
        temperature: { current, feelsLike },
        condition,
        summary,
        pressure,
        humidity,
        dewPoint,
        uvi,
        clouds,
        visibility,
        windSpeed,
        windDeg,
        windGust,
      } = ctx as unknown as hourlyWeatherData;

      console.log("\x1b[34m%s\x1b[0m", date);

      console.log(
        "\x1b[34m%s\x1b[0m",
        `Temperature in ${location} is ${current}${tempUnit}, but feels like ${feelsLike}${tempUnit} \n`
      ),
        console.log(
          "\x1b[34m%s\x1b[0m",
          `Conditions are currently: ${condition} \n`
        ),
        console.log(
          "\x1b[34m%s\x1b[0m",
          `What you shoud expect: ${summary} \n`
        ),
        (pressure ||
          humidity ||
          dewPoint ||
          uvi ||
          clouds ||
          visibility ||
          windSpeed ||
          windDeg ||
          windGust) &&
          console.log("\x1b[31m%s\x1b[0m", "Additional information"),
        pressure && console.log("\x1b[34m%s\x1b[0m", "Pressure: ", pressure),
        humidity && console.log("\x1b[34m%s\x1b[0m", "Humidity: ", humidity),
        dewPoint && console.log("\x1b[34m%s\x1b[0m", "DewPoint: ", dewPoint),
        uvi && console.log("\x1b[34m%s\x1b[0m", "Uvi: ", uvi),
        clouds && console.log("\x1b[34m%s\x1b[0m", "Clouds: ", clouds),
        visibility &&
          console.log("\x1b[34m%s\x1b[0m", "Visibility: ", visibility),
        windSpeed && console.log("\x1b[34m%s\x1b[0m", "WindSpeed: ", windSpeed),
        windDeg && console.log("\x1b[34m%s\x1b[0m", "WindDeg: ", windDeg),
        windGust && console.log("\x1b[34m%s\x1b[0m", "WindGust: ", windGust);
      console.log(
        "-----------------------------------------------------------------------------------"
      );
    }

    return;
  }

  if (type === openweatherResObjKeys.DAILY && Array.isArray(data)) {
    console.log("\x1b[34m%s\x1b[0m", "Displaying 8day forecast: ");

    for (const ctx of data) {
      const {
        date,
        temperature: { day, min, max, night },
        condition,
        summary,
        sunrise,
        sunset,
        moonrise,
        moonset,
        pressure,
        humidity,
        dewPoint,
        uvi,
        clouds,
        visibility,
        windSpeed,
        windDeg,
        windGust,
      } = ctx as unknown as dailyWeatherData;

      console.log("\n");
      console.log("\x1b[34m%s\x1b[0m", date);
      console.log(
        "\x1b[34m%s\x1b[0m",
        `Temperature in ${location}} during the day is ${day}${tempUnit}, reaching a high of ${max}${tempUnit}, and at night ${night}${tempUnit} with the lowest point being ${min}${tempUnit}  \n`
      );
      console.log(
        "\x1b[34m%s\x1b[0m",
        `Conditions are currently: ${condition} \n`
      );
      console.log("\x1b[34m%s\x1b[0m", `What you shoud expect: ${summary} \n`);
      console.log(
        "\x1b[34m%s\x1b[0m",
        `The sun and moon rise at ${sunrise} and ${moonrise} respectively, and set at ${sunset} and ${moonset} \n`
      );
      (pressure ||
        humidity ||
        dewPoint ||
        uvi ||
        clouds ||
        visibility ||
        windSpeed ||
        windDeg ||
        windGust) &&
        console.log("\x1b[31m%s\x1b[0m", "Additional information");
      pressure && console.log("\x1b[34m%s\x1b[0m", "Pressure: ", pressure);
      humidity && console.log("\x1b[34m%s\x1b[0m", "Humidity: ", humidity);
      dewPoint && console.log("\x1b[34m%s\x1b[0m", "DewPoint: ", dewPoint);
      uvi && console.log("\x1b[34m%s\x1b[0m", "Uvi: ", uvi);
      clouds && console.log("\x1b[34m%s\x1b[0m", "Clouds: ", clouds);
      visibility &&
        console.log("\x1b[34m%s\x1b[0m", "Visibility: ", visibility);
      windSpeed && console.log("\x1b[34m%s\x1b[0m", "WindSpeed: ", windSpeed);
      windDeg && console.log("\x1b[34m%s\x1b[0m", "WindDeg: ", windDeg);
      windGust && console.log("\x1b[34m%s\x1b[0m", "WindGust: ", windGust);
      console.log(
        "-----------------------------------------------------------------------------------"
      );
    }

    return;
  }
};

export const errorResponse = (name: string, message: string) => {
  return console.error(
    "\x1b[33m%s\x1b[0m",
    `${name.toUpperCase()}: ${message} `
  );
};

export const inputParserErrorResponse = (
  msg: string,
  type: (typeof cliErrorMessages)[keyof typeof cliErrorMessages]["type"],
  cmd: string
) => {
  return (
    console.log("\n"),
    console.error("\x1b[31m%s\x1b[0m", `${msg}: '${cmd}' \n \n `),
    console.error(
      "\x1b[33m%s\x1b[0m",
      "To see a list of supported weather-cli commands run: \n  weather-cli -h | --help"
    )
  );
};

export const helpResponse = (): void => {
  return (
    console.log("\n"),
    console.log("\x1b[33m%s\x1b[0m", "weather-cli <city>"),
    console.log("\x1b[33m%s\x1b[0m", "Usage:"),
    console.log("\x1b[33m%s\x1b[0m", "weather-cli city state -f"),
    console.log("\x1b[33m%s\x1b[0m", "weather-cli -h"),
    console.log("\x1b[33m%s\x1b[0m", "weather-cli city -cr -c \n"),
    console.log(
      "\x1b[33m%s\x1b[0m",
      "All commands: \n     -f ,--farhenheit, \n     -c, --celsius, \n     -h, --help \n     -cr, --current, \n     -hr, --hourly \n     -dy, --daily, \n     -s, --stat, \n     --set-c, --set-key-geocode, \n     --set-w, --set-key-weather \n"
    ),
    console.log(
      "\x1b[33m%s\x1b[0m",
      "To view documentation, visit:",
      `\u001b]8;;${"https://github.com/payn33/chingu-tier-3-solo-project/blob/main/README.md"}\u001b\\${"here"}\u001b]8;;\u001b\\`
    )
  );
};
