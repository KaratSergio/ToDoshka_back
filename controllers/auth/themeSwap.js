import User from "../../models/user.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const themeSwap = async (req, res) => {
  const { user } = req;
  const { theme } = req.body;

  try {
    await User.findOneAndUpdate({ _id: user._id }, { theme });
    res.json({ message: "Theme changed successfully" });
  } catch (err) {
    throw err;
  }
};

export default ctrlWrapper(themeSwap);
