import User from "../../models/user.js";
import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userEmail = await User.findOne({ email });
  if (userEmail) {
    throw HttpError(409, "Email is already in use");
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

export default ctrlWrapper(register);
