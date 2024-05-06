import User from "../../models/user.js";

import HttpError from "../../helpers/HttpError.js";

import authSchema from "../../schemas/schemaAuth.js";

import BadRequestError from "../../helpers/BadRequestError.js";

const register = async (req, res, next) => {
  const { value, error } = authSchema.registerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(new BadRequestError("Validation failed", error.details));
  }
  const { name, email, password } = value;

  const userEmail = await User.findOne({ email });
  if (userEmail) {
    throw new HttpError(409, "Email is already in use");
  }

  const newUser = await User.create({ name, email, password });
  const accessToken = newUser.tokenAuth();
  newUser.accessToken = accessToken;
  await newUser.save();
  res.status(201).json({
    accessToken,
    user: {
      name: newUser.name,
      email: newUser.email,
      theme: newUser.theme,
      avatarURL: newUser.avatarURL,
    },
  });
};

export default register;
