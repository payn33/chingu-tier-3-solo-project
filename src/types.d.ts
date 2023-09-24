export type argsParserOutput = {
  city: string;
  state: string;
  verboseCmds: { name: string; value: string }[];
  terseCmds: { name: string; value: string }[];
};

export type geocodeResponse = {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: {
    road?: string;
    city?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
}[];

export type formattedGeocodeRes = {
  lat: string;
  lng: string;
  location: {
    city?: string;
    state?: string;
    country?: string;
    description: string;
  };
}[];

export type openweatherResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: { id: number; main: string; description: string; icon: string }[];
  };
  minutely: {
    dt: number;
    precipitation: number;
  }[];
  hourly: {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: { id: number; main: string; description: string; icon: string }[];
    pop: 0;
  }[];
  daily: {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: { day: number; night: number; eve: number; morn: number };
    pressure: nubmer;
    humidity: nubmer;
    dew_point: number;
    wind_speed: number;
    wind_deg: nubmer;
    wind_gust: number;
    weather: { id: nubmer; main: string; description: string; icon: string }[];
    clouds: number;
    pop: number;
    rain: number;
    uvi: number;
  }[];
  [key: string]: string;
};

export type currentWeatherData = {
  date: string;
  description: string;
  temperature: {
    current: number;
    feelsLike: number;
  };
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  condition: string;
  summary: string;

  pressure?: number;
  humidity?: number;
  dewPoint?: number;
  uvi?: number;
  clouds?: number;
  visibility?: number;
  windSpeed?: number;
  windDeg?: number;
  windGust?: number;
};


export type hourlyWeatherData = {
  date: string;
  description: string;
  temperature: {
    current: number;
    feelsLike: number;
  };
  condition: string;
  summary: string;

  pressure?: number;
  humidity?: number;
  dewPoint?: number;
  uvi?: number;
  clouds?: number;
  visibility?: number;
  windSpeed?: number;
  windDeg?: number;
  windGust?: number;
};

export type dailyWeatherData = {
  date: string;
  description: string;
  temperature: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  condition: string;
  summary: string;

  pressure?: number;
  humidity?: number;
  dewPoint?: number;
  uvi?: number;
  clouds?: number;
  visibility?: number;
  windSpeed?: number;
  windDeg?: number;
  windGust?: number;
};