import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import Board from "../../models/board.js";
import User from "../../models/user.js";

const addUser = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "User does not exist");
  }

  const board = await Board.findById(id);
  if (!board) {
    throw HttpError(404, "Board not found");
  }
  if (board.owners.includes(user._id)) {
    throw HttpError(
      409,
      `User ${user.email} is already an owner of board ${id}`
    );
  }

  await Board.findByIdAndUpdate(id, { $push: { owners: user._id } });

  res.json({
    message: `User ${user.email} has successfully been added as an owner to board ${id}`,
  });
};

export default ctrlWrapper(addUser);
