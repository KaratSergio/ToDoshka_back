// import bcrypt from "bcrypt";

// //import ctrlWrapper from "../../decorators/ctrlWrapper.js";

// import * as servicesAuth from "../../services/servicesAuth.js";

// import HttpError from "../../helpers/HttpError.js";

// import { generateToken } from "../../helpers/tokenAuth.js";

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await servicesAuth.findUser({ email });
//   if (!user) {
//     throw HttpError(401, "Email or password is wrong");
//   }

//   const comparePassword = await bcrypt.compare(password, user.password);
//   if (!comparePassword) {
//     throw HttpError(401, "Email or password is wrong");
//   }

//   const { _id: id } = user;

//   const payload = {
//     id,
//   };

//   const token = generateToken(payload);
//   await servicesAuth.updateUser({ _id: id }, { token });
//   res.status(201).json({
//     user: {
//       email: user.email,
//       token: token,
//     },
//   });
// };

// export default login;

import User from "../../models/user.js";

import HttpError from "../../helpers/HttpError.js";

import authSchemas from "../../schemas/schemaAuth.js";

import BadRequestError from "../../helpers/BadRequestError.js";

const login = async (req, res, next) => {
  const { value, error } = authSchemas.loginSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(new BadRequestError("Validation failed", error.details));
  }

  const { email, password } = value;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(401, "Email is wrong");
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      throw new HttpError(401, "Password is wrong");
    }

    const accessToken = user.tokenAuth();
    if (user.accessToken !== accessToken) {
      await User.findOneAndUpdate({ email }, { accessToken });
    }

    res.json({
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        theme: user.theme,
        avatarURL: user.avatarURL,
      },
    });
  } catch (err) {
    next();
  }
};

export default login;
