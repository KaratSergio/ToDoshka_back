import User from "../../models/user.js";

const logout = async (req, res, next) => {
  const { user } = req;
  await User.findOneAndUpdate({ _id: user._id }, { accessToken: "" });
  res.status(204).json();
};

export default logout;
