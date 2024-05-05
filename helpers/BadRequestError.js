import HttpError from "./HttpError.js";

const BadRequestError = (req, res, next) => {
  const { error } = req.bodyValidation;
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(",  ");
    next(new HttpError(400, errorMessage));
  } else {
    next();
  }
};

export default BadRequestError;
