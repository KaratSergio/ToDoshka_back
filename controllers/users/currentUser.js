import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const currentUser = async (req, res) => {
  const { _id, name, email, theme, avatarURL } = req.user;
  res.json({ _id, name, email, theme, avatarURL });
};

export default ctrlWrapper(currentUser);
