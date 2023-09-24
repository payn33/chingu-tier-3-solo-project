#!/usr/bin/env node
import { config } from "dotenv";
config();
import { customArgsParser } from "./helpers/parseInput";
import { argv } from "process";
import { handleError } from "./helpers/handleError";
import executeCommands from "./helpers/executeCommands";

const parseClInput = () => {
  try {
    const response = customArgsParser(argv.slice(2));

    if (response) {
      executeCommands(response);
    }
  } catch (err) {
    const e = err as Error;
    handleError(e);
  }
};

parseClInput();
