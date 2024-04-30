import HttpError from "./HttpError.js";

const BadRequestError = (error, req, res, next) => {
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(",  ");
    throw new HttpError(400, errorMessage);
  }
};

export default BadRequestError;
