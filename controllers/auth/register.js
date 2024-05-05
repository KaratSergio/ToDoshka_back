import User from "../../models/user.js";

import HttpError from "../../helpers/HttpError.js";

import authSchema from "../../schemas/schemaAuth.js";

import BadRequestError from "../../helpers/badRequestError.js";

const register = async (req, res, next) => {
  const { value, error } = authSchema.registerSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const httpError = BadRequestError(error, req, res);
    return next(httpError);
  }
  const { name, email, password } = value;

  const userEmail = await User.findOne({ email });
  if (userEmail) {
    return next(HttpError(409, "Email has already in use"));
  }

  const result = await User.create({ name, email, password });
  res.status(201).json(result);
};

export default register;
