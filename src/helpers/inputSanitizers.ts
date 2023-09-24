import {
  verboseInputCommandsArr,
  terseInputCommandsArr,
  cliInputType,
  cliErrorMessages,
} from "../utils/constants";

const specialCharsRegex = /[!@#$%^&*()~,.?":{}|<>]/g;
const alphabetCharsRegex = /[a-zA-Z]/;

const haveSameProperties = (
  arr1: { name: string; value: string }[],
  arr2: { name: string; value: string }[],
  propName: "name" | "value"
): string | boolean => {
  for (let obj1 of arr1) {
    for (let obj2 of arr2) {
      if (obj1[propName] === obj2[propName]) {
        return obj2[propName];
      }
    }
  }
  return false;
};

const inputSanitizers = (
  props: string[]
): {
  error: boolean;
  errorMessage: string;
  errorType: string;
  errorCommand: string;
  city: string;
  state: string;
  verboseCmds: { name: string; value: string }[];
  terseCmds: { name: string; value: string }[];
} => {
  let err = false;
  let errMsg = "";
  let errType = "";
  let errCmd = "";
  let city = "";
  let state = "";
  const terseCmdsArr = [] as { name: string; value: string }[];
  const verboseCmdsArr = [] as { name: string; value: string }[];

  const hasTerseSetApiKeyCmd = terseInputCommandsArr.find((ctx) => {
    return ctx.name === cliInputType.APIKEY;
  });

  const hasVerbSetApiKeyCmd = verboseInputCommandsArr.find((ctx) => {
    return ctx.name === cliInputType.APIKEY;
  });

  for (let idx = 0; idx < props.length; idx++) {
    const inputCmdPrefix = props[idx].indexOf("-");

    const terseCmd = terseInputCommandsArr.find((ctx) => {
      return ctx.value === props[idx];
    });
    const verbCmd = verboseInputCommandsArr.find((ctx) => {
      return ctx.value === props[idx];
    });

    if (typeof props[idx] !== "string")
      return {
        error: true,
        errorMessage: cliErrorMessages.INVALID_INPUT.message,
        errorType: cliErrorMessages.INVALID_INPUT.type,
        errorCommand: props[idx],
        city: "",
        state: "",
        terseCmds: [],
        verboseCmds: [],
      };

    if (props[idx].length < 2)
      return {
        error: true,
        errorMessage: cliErrorMessages.INVALID_INPUT.message,
        errorType: cliErrorMessages.INVALID_INPUT.type,
        errorCommand: props[idx],
        city: "",
        state: "",
        terseCmds: [],
        verboseCmds: [],
      };

    if (specialCharsRegex.test(props[idx]))
      return {
        error: true,
        errorMessage: cliErrorMessages.INVALID_INPUT_SPECIAL_CHARS.message,
        errorType: cliErrorMessages.INVALID_INPUT_SPECIAL_CHARS.type,
        errorCommand: props[idx],
        city: "",
        state: "",
        terseCmds: [],
        verboseCmds: [],
      };

    if (!alphabetCharsRegex.test(props[idx]))
      return {
        error: true,
        errorMessage: cliErrorMessages.INVALID_INPUT.message,
        errorType: cliErrorMessages.INVALID_INPUT.type,
        errorCommand: props[idx],
        city: "",
        state: "",
        terseCmds: [],
        verboseCmds: [],
      };

    if (
      idx === 0 &&
      inputCmdPrefix === 0 &&
      !terseCmd &&
      !verbCmd &&
      hasTerseSetApiKeyCmd?.value !== props[idx] &&
      hasVerbSetApiKeyCmd?.value !== props[idx]
    ) {
      return {
        error: true,
        errorMessage: cliErrorMessages.INVALID_INPUT_COMMAND.message,
        errorType: cliErrorMessages.INVALID_INPUT_COMMAND.type,
        errorCommand: props[idx],
        city: "",
        state: "",
        terseCmds: [],
        verboseCmds: [],
      };
    }

    if (
      (idx === 0 &&
        inputCmdPrefix === 0 &&
        terseCmd?.name === cliInputType.HELP &&
        props[idx + 1]) ||
      (idx === 0 &&
        inputCmdPrefix === 0 &&
        verbCmd?.name === cliInputType.HELP &&
        props[idx + 1])
    ) {
      return {
        error: true,
        errorMessage: cliErrorMessages.INVALID_INPUT_COMMAND.message,
        errorType: cliErrorMessages.INVALID_INPUT_COMMAND.type,
        errorCommand: props[idx + 1],
        city: "",
        state: "",
        terseCmds: [],
        verboseCmds: [],
      };
    }
    if (
      idx === 0 &&
      inputCmdPrefix === 0 &&
      terseCmd?.name !== cliInputType.HELP &&
      hasTerseSetApiKeyCmd?.value !== props[idx] &&
      idx === 0 &&
      inputCmdPrefix === 0 &&
      verbCmd?.name !== cliInputType.HELP &&
      hasVerbSetApiKeyCmd?.value !== props[idx]
    ) {
      return {
        error: true,
        errorMessage: cliErrorMessages.INVALID_INPUT_COMMAND.message,
        errorType: cliErrorMessages.INVALID_INPUT_COMMAND.type,
        errorCommand: props[idx],
        city: "",
        state: "",
        terseCmds: [],
        verboseCmds: [],
      };
    }

    if (inputCmdPrefix !== -1 && inputCmdPrefix <= 2 && !terseCmd && !verbCmd) {
      return {
        error: true,
        errorMessage: cliErrorMessages.INVALID_INPUT_COMMAND.message,
        errorType: cliErrorMessages.INVALID_INPUT_COMMAND.type,
        errorCommand: props[idx],
        city: "",
        state: "",
        terseCmds: [],
        verboseCmds: [],
      };
    }

    if (
      idx === 0 &&
      (hasTerseSetApiKeyCmd?.value === props[0] ||
        hasVerbSetApiKeyCmd?.value === props[0]) &&
      !props[1]
    ) {
      return {
        error: true,
        errorMessage: cliErrorMessages.INVALID_INPUT_COMMAND.message,
        errorType: cliErrorMessages.INVALID_INPUT_COMMAND.type,
        errorCommand: props[idx],
        city: "",
        state: "",
        terseCmds: [],
        verboseCmds: [],
      };
    }

  }

  for (let idx = 0; idx < props.length; idx++) {
    const terseCmd = terseInputCommandsArr.find((ctx) => {
      return ctx.value === props[idx];
    });
    const verbCmd = verboseInputCommandsArr.find((ctx) => {
      return ctx.value === props[idx];
    });
    if (
      idx === 0 &&
      !terseCmd &&
      hasTerseSetApiKeyCmd?.value !== props[idx] &&
      idx === 0 &&
      !verbCmd &&
      hasVerbSetApiKeyCmd?.value !== props[idx]
    ) {
      city = props[idx];
    }

    if (
      idx === 1 &&
      !terseCmd &&
      hasTerseSetApiKeyCmd?.value !== props[idx] &&
      idx === 1 &&
      !verbCmd &&
      hasVerbSetApiKeyCmd?.value !== props[idx]
    ) {
      state = props[idx];
    }

    if (terseCmd) terseCmdsArr.push(terseCmd);
    if (verbCmd) verboseCmdsArr.push(verbCmd);
  }

  const haveSameTerseVerboseProps = haveSameProperties(
    verboseCmdsArr,
    terseCmdsArr,
    "name"
  );

  if (typeof haveSameTerseVerboseProps === "string")
    return {
      error: true,
      errorMessage: cliErrorMessages.INVALID_INPUT_DUPLICATE_COMMAND.message,
      errorType: cliErrorMessages.INVALID_INPUT_DUPLICATE_COMMAND.type,
      errorCommand: haveSameTerseVerboseProps,
      city: "",
      state: "",
      terseCmds: [],
      verboseCmds: [],
    };

  return {
    error: err,
    errorMessage: errMsg,
    errorType: errType,
    errorCommand: errCmd,
    city,
    state,
    verboseCmds: verboseCmdsArr,
    terseCmds: terseCmdsArr,
  };
};

export default inputSanitizers;
