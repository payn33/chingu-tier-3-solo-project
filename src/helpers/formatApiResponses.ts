import {
  geocodeResponse,
  formattedGeocodeRes,
  openweatherResponse,
  currentWeatherData,
  hourlyWeatherData,
  dailyWeatherData,
} from "../types";
import { openweatherResObjKeys } from "../utils/constants";
import formatDateTime from "./formatDateTime";

export const formatGeocodeRes = (
  props: geocodeResponse
): formattedGeocodeRes => {
  const res = [] as formattedGeocodeRes;

  for (const entry of props) {
    res.push({
      lat: entry.lat,
      lng: entry.lon,
      location: {
        city: entry.address?.city,
        state: entry.address?.state,
        country: entry.address?.country,
        description: entry.display_name,
      },
    });
  }

  return res;
};

type OpenweatherResObjKeys =
  (typeof openweatherResObjKeys)[keyof typeof openweatherResObjKeys];

export const formatOpenweatherRes = (
  data: openweatherResponse,
  terseCmds: { name: string; value: string }[],
  verboseCmds: { name: string; value: string }[]
): {
  type: OpenweatherResObjKeys;
  data: currentWeatherData | hourlyWeatherData[] | dailyWeatherData[];
} => {
  let hrIdx = 0; //max 48hrs
  let dyIdx = 0; //max 8days
  const cr = [] as unknown as currentWeatherData[];
  const hr = [] as unknown as hourlyWeatherData[];
  const dy = [] as unknown as dailyWeatherData[];

  const hrTerse = terseCmds.find((ctx) => {
    return ctx.value === "-hr";
  });
  const hrVerb = verboseCmds.find((ctx) => {
    return ctx.value.replace("--", "") === openweatherResObjKeys.HOURLY;
  });
  const dyTerse = terseCmds.find((ctx) => {
    return ctx.value === "-dy";
  });
  const dyVerb = verboseCmds.find((ctx) => {
    return ctx.value.replace("--", "") === openweatherResObjKeys.DAILY;
  });
  const statTerse = terseCmds.find((ctx) => {
    return ctx.value === "-s";
  });
  const statVerb = verboseCmds.find((ctx) => {
    return ctx.value.replace("--", "") === openweatherResObjKeys.STAT;
  });

  const { current, daily, hourly } = data;

  for (const ctx of Object.keys(data)) {
    if (ctx === openweatherResObjKeys.CURRENT) {
      const payload = {
        date: formatDateTime(current.dt),
        description: current.weather[0].description,
        temperature: {
          current: current.temp,
          feelsLike: current.feels_like,
        },
        sunrise: formatDateTime(current.sunrise, true),
        sunset: formatDateTime(current.sunset, true),
        moonrise: formatDateTime(daily[0].moonrise, true),
        moonset: formatDateTime(daily[0].moonset, true),
        condition: current.weather[0].description,
        summary: `Expect a day of ${daily[0].weather[0].description}`,
      };

      const stats =
        statTerse || statVerb
          ? {
              pressure: current.pressure,
              humidity: current.humidity,
              dewpoint: current.dew_point,
              uvi: current.uvi,
              clouds: current.clouds,
              visibility: current.visibility,
              windSpeed: current.wind_speed,
              windDeg: current.wind_deg,
            }
          : "";

      cr.push({ ...payload, ...stats });
    }

    if (
      (ctx === openweatherResObjKeys.HOURLY && hrTerse) ||
      (ctx === openweatherResObjKeys.HOURLY && hrVerb)
    ) {
      for (const hourlyCtx of hourly) {
        const payload = {
          date: formatDateTime(hourlyCtx.dt),
          description: hourlyCtx.weather[0].description,
          temperature: {
            current: hourlyCtx.temp,
            feelsLike: hourlyCtx.feels_like,
          },

          condition: hourlyCtx.weather[0].description,
          summary:
            hrIdx < 24
              ? `Expect a day of ${daily[0].weather[0].description}`
              : `Expect a day of ${daily[1].weather[0].description}`, // for hourlyCtx<12 use 0 else 1
        };

        const stats =
          statTerse || statVerb
            ? {
                pressure: hourlyCtx.pressure,
                humidity: hourlyCtx.humidity,
                dewpoint: hourlyCtx.dew_point,
                uvi: hourlyCtx.uvi,
                clouds: hourlyCtx.clouds,
                visibility: hourlyCtx.visibility,
                windSpeed: hourlyCtx.wind_speed,
                windDeg: hourlyCtx.wind_deg,
              }
            : "";

        hr.push({ ...payload, ...stats });
        hrIdx++;
      }
    }

    if (
      (ctx === openweatherResObjKeys.DAILY && dyTerse) ||
      (ctx === openweatherResObjKeys.DAILY && dyVerb)
    ) {
      for (const dailyCtx of daily) {
        const payload = {
          date: formatDateTime(dailyCtx.dt),
          description: dailyCtx.weather[0].description,
          temperature: {
            day: dailyCtx.temp.day,
            min: dailyCtx.temp.min,
            max: dailyCtx.temp.max,
            night: dailyCtx.temp.night,
            eve: dailyCtx.temp.eve,
            morn: dailyCtx.temp.morn,
          },
          sunrise: formatDateTime(dailyCtx.sunrise, true),
          sunset: formatDateTime(dailyCtx.sunset, true),
          moonrise: formatDateTime(dailyCtx.moonrise, true),
          moonset: formatDateTime(dailyCtx.moonset, true),
          condition: dailyCtx.weather[0].description,
          summary: `Expect a day of ${daily[dyIdx].weather[0].description}`,
        };

        console.log(statTerse, statVerb);

        const stats =
          statTerse || statVerb
            ? {
                pressure: dailyCtx.pressure,
                humidity: dailyCtx.humidity,
                dewpoint: dailyCtx.dew_point,
                uvi: dailyCtx.uvi,
                clouds: dailyCtx.clouds,
                windSpeed: dailyCtx.wind_speed,
                windDeg: dailyCtx.wind_deg,
                windGust: dailyCtx.wind_gust,
              }
            : "";

        dy.push({ ...payload, ...stats });
        dyIdx++;
      }
    }
  }

  if (hrTerse || hrVerb)
    return { type: openweatherResObjKeys.HOURLY, data: hr };

  if (dyTerse || dyVerb) return { type: openweatherResObjKeys.DAILY, data: dy };

  return { type: openweatherResObjKeys.CURRENT, data: cr[0] };
};
