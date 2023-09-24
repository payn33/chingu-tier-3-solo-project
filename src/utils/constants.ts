export const verboseInputCommandsArr = [
  { name: "temperature", value: "--farhenheit" },
  { name: "temperature", value: "--celsius" },
  { name: "help", value: "--help" },
  { name: "timeframe", value: "--current" },
  { name: "setApiKey", value: "--set-key-weather" },
  { name: "setApiKey", value: "--set-key-geocode" },
  { name: "timeframe", value: "--hourly" },
  { name: "timeframe", value: "--daily" },
  { name: "stats", value: "--stat" },
];

export const terseInputCommandsArr = [
  { name: "temperature", value: "-f" },
  { name: "temperature", value: "-c" },
  { name: "help", value: "-h" },
  { name: "timeframe", value: "-cr" },
  { name: "setApiKey", value: "-set-w" },
  { name: "setApiKey", value: "-set-c" },
  { name: "timeframe", value: "-hr" },
  { name: "timeframe", value: "-dy" },
  { name: "stats", value: "-s" },
];

export const cliInputType = {
  CITY: "city",
  state: "state",
  TEMPERATURE: "temperature",
  TIMEFRAME: "timeframe",
  STATS: "stats",
  HELP: "help",
  APIKEY: "setApiKey",
};

export const cliErrorMessages = {
  INVALID_INPUT: {
    message: "invalid input",
    type: "invalid_input",
  },
  INVALID_INPUT_SPECIAL_CHARS: {
    message: "input contains invalid characters",
    type: "special_char",
  },
  INVALID_INPUT_CITY_SPECIAL_CHARS: {
    message: "city contains invalid characters",
    type: "city_special_char",
  },
  INVALID_INPUT_COMMAND: {
    message: "invalid command",
    type: "invalid_command",
  },
  INVALID_INPUT_DUPLICATE_COMMAND: {
    message: "input contains duplicate commands",
    type: "duplicate_command",
  },
  INVALID_INPUT_INVALID_TERSE_COMMAND: {
    message: "input is not a valid terse command",
    type: "invalid_terse_command",
  },
  INVALID_INPUT_INVALID_VERBOSE_COMMAND: {
    message: "input is not a valid verbose command",
    type: "invalid_verbose_command",
  },
};

export const measurementUnits = {
  METRIC: { value: "metric", terseSign: "-c", verbSign: "--celsius" },
  IMPERIAL: { value: "imperial", terseSign: "-f", verbSign: "--farhenheit" },
};

export const openweatherResObjKeys = {
  CURRENT: "current",
  HOURLY: "hourly",
  DAILY: "daily",
  STAT: "stat",
};

export const setApiKeyCmds = {
  openweather: { terse: "-set-w", verb: "--set-key-weather" },
  geocode: { terse: "-set-c", verb: "--set-key-geocode" },
};
