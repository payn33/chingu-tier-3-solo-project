import inputSanitizer from "./inputSanitizers";
import {
  helpResponse,
  inputParserErrorResponse,
} from "./formatConsoleResponses";
import { argsParserOutput } from "../types";

export const customArgsParser = (props: string[]): argsParserOutput | void => {
  if (props.length === 0) return helpResponse();

  const {
    error,
    errorMessage,
    errorType,
    errorCommand,
    city,
    state,
    verboseCmds,
    terseCmds,
  } = inputSanitizer(props);

  if (error)
    return inputParserErrorResponse(errorMessage, errorType, errorCommand);

  return { city, state, verboseCmds, terseCmds };
};