import { isHTTPError, isKyError } from "ky";

const processError = async (e: unknown) => {
  if (isHTTPError(e)) {
    console.error(e);
  } else if (isKyError(e)) {
    console.error(e.message);
  } else if (e instanceof Error) {
    console.error(e);
  }
};

export default processError;
