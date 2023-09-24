import { errorResponse } from "./formatConsoleResponses";

export class RequestError extends Error {
  isRequestError: boolean;
  constructor(message?: string) {
    super(message || "A network error occured");
    this.name = "Request error";
    this.isRequestError = true;

    Error.captureStackTrace(this, RequestError);
  }
}

export const handleError = (e: any) => {
  const { name, message } = e;

  if (e.isRequestError) {
    errorResponse(name, message);
  }
  return process.exit(1);
};
