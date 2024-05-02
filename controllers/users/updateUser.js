import User from "../../models/user.js";

import authSchema from "../../schemas/schemaAuth.js";

import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import BadRequestError from "../../helpers/BadRequestError.js";

import { hashPasswordMiddleware } from "../../helpers/hashPassword.js";

const updateUser = async (req, res, next) => {
  const { _id, email: oldEmail, name: oldName } = req.user;
  const { value, error } = authSchema.updateSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(new BadRequestError("Validation failed", error.details));
  }

  const { name = oldName, email = oldEmail, password } = value;
  const updatedUser = { name };

  if (password) {
    try {
      updatedUser.password = await hashPasswordMiddleware(password);
      updatedUser.accessToken = "";
    } catch (err) {
      return next(new BadRequestError("Password hashing failed", err));
    }
  }

  if (email && email !== oldEmail) {
    updatedUser.email = email;
    updatedUser.accessToken = "";
  }

  try {
    const result = await User.findByIdAndUpdate(_id, updatedUser, {
      new: true,
      select: "name email theme avatarURL -_id",
    });

    if (!result) {
      return next(new BadRequestError("User not found"));
    }

    res.status(200).json(result);
  } catch (err) {
    next(new BadRequestError("Failed to update user", err));
  }
};

export default ctrlWrapper(updateUser);
