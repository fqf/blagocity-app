import { isHTTPError, isKyError } from "ky";

const processError = async (e: unknown) => {
  if (isHTTPError(e)) {
    const error = await e.response.json();
    console.error(error);
  } else if (isKyError(e)) {
    console.error(e.message);
  } else if (e instanceof Error) {
    console.error(e.message ?? e);
  }
};

export default processError;
