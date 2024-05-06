import User from "../../models/user.js";
import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email is wrong");
  }

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    throw HttpError(401, "Password is wrong");
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
};

export default ctrlWrapper(login);
