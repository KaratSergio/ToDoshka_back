import User from "../../models/user.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import { hashPasswordMiddleware } from "../../helpers/hashPassword.js";

const updateUser = async (req, res) => {
  const { _id, email: oldEmail, name: oldName } = req.user;

  if (req.file) {
    const avatarURL = req.file.path;
    await User.findByIdAndUpdate(_id, { avatarURL });
  }

  const { name = oldName, email = oldEmail, password } = req.body;
  const updatedUser = { name };

  if (password) {
    updatedUser.password = await hashPasswordMiddleware(password);
    // updatedUser.accessToken = "";
  }

  if (email && email !== oldEmail) {
    updatedUser.email = email;
    // updatedUser.accessToken = "";
  }

  const result = await User.findByIdAndUpdate(_id, updatedUser, {
    new: true,
    select: "name email theme avatarURL -_id",
  });

  if (!result) {
    return next(new BadRequestError("User not found"));
  }

  res.status(200).json(result);
};

export default ctrlWrapper(updateUser);
