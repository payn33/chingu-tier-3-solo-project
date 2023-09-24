import { argsParserOutput, openweatherResponse } from "../types";
import { helpResponse, weatherSuccessResponse } from "./formatConsoleResponses";
import { getCoordinates } from "../services/geocode";
import { RequestError, handleError } from "./handleError";
import { coordinatesResponse as displayCoordinatesResponse } from "./formatConsoleResponses";
import { getWeatherData } from "../services/openweather";
import { formatOpenweatherRes } from "./formatApiResponses";
import {
  cliInputType,
  measurementUnits,
  setApiKeyCmds,
} from "../utils/constants";
import { writeToEnvFile, writeToTxtFile } from "./writeToFile";

const executeCommands = async (props: argsParserOutput) => {
  try {
    const { city, state, verboseCmds, terseCmds } = props;

    const terseHelpCmd = terseCmds.find((ctx) => {
      return ctx.name === cliInputType.HELP;
    });

    const verbHelpCmd = verboseCmds.find((ctx) => {
      return ctx.name === cliInputType.HELP;
    });

    if (verbHelpCmd || terseHelpCmd) return helpResponse();

    const hasTerseSetWeatherApiKey = terseCmds.find((ctx) => {
      return ctx.value === setApiKeyCmds.openweather.terse;
    });

    const hasVerbSetWeatherApiKey = verboseCmds.find((ctx) => {
      return ctx.value === setApiKeyCmds.openweather.verb;
    });

    const hasTerseSetGeocodeApiKey = terseCmds.find((ctx) => {
      return ctx.value === setApiKeyCmds.geocode.terse;
    });

    const hasVerbSetGeocodeApiKey = verboseCmds.find((ctx) => {
      return ctx.value === setApiKeyCmds.geocode.verb;
    });

    if (hasTerseSetGeocodeApiKey || hasVerbSetGeocodeApiKey)
      return writeToEnvFile("LOCATION_IQ_API_KEY", process.argv.slice(3)[0]);

    if (hasTerseSetWeatherApiKey || hasVerbSetWeatherApiKey)
      return writeToEnvFile("OPEN_WEATHER_API_KEY", process.argv.slice(3)[0]);

    const coordinatesResponse = await getCoordinates(city, state);

    if (!Array.isArray(coordinatesResponse))
      throw new RequestError(coordinatesResponse.error);

    const res = await displayCoordinatesResponse(coordinatesResponse);

    if (res) {
      const {
        lat,
        lng,
        location: { description },
      } = res;

      const terseImperial = terseCmds.find((ctx) => {
        return ctx.value === measurementUnits.IMPERIAL.terseSign;
      });
      const verbImperial = verboseCmds.find((ctx) => {
        return ctx.value === measurementUnits.IMPERIAL.verbSign;
      });

      const unit =
        terseImperial || verbImperial
          ? measurementUnits.IMPERIAL.value
          : measurementUnits.METRIC.value; //default -c
      const weatherData = await getWeatherData(lat, lng, unit);

      if (weatherData.hasOwnProperty("cod")) {
        const { message } = weatherData as {
          cod: number;
          message: string;
        };
        throw new RequestError(message);
      }

      const formattedWeatherData = formatOpenweatherRes(
        weatherData as openweatherResponse,
        terseCmds,
        verboseCmds
      );

      weatherSuccessResponse(formattedWeatherData, description, unit);

      const stringifiedData =
        JSON.stringify(formattedWeatherData.data)
          .replace(/":\{/g, '":{"')
          .replace(/\},/g, "},")
          .replace(/\{|\}/g, "")
          .replace(/",/g, '",') + "   -------------------------------   \n";

      return writeToTxtFile(stringifiedData);
    }
  } catch (err) {
    handleError(err);
  }
};

export default executeCommands;
