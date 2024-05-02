import bcrypt from "bcrypt";

//import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import * as servicesAuth from "../../services/servicesAuth.js";

import HttpError from "../../helpers/HttpError.js";

import { generateToken } from "../../helpers/tokenAuth.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await servicesAuth.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = generateToken(payload);
  await servicesAuth.updateUser({ _id: id }, { token });
  res.status(201).json({
    user: {
      email: user.email,
      token: token,
    },
  });
};

export default login;
