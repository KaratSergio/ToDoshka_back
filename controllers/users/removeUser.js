import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import Board from "../../models/board.js";
import User from "../../models/user.js";

const removeUser = async (req, res) => {
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
  if (!board.owners.includes(user._id)) {
    throw HttpError(400, `User ${user.email} is not an owner of board ${id}`);
  }
  if (board.owners.length < 2) {
    throw HttpError(
      409,
      `User ${user.email} is the only owner of the board ${id}. It's preferable to delete the board instead.`
    );
  }

  await Board.findByIdAndUpdate(id, { $pull: { owners: user._id } });

  res.json({
    message: `User ${user.email} has successfully been removed from board ${id}`,
  });
};

export default ctrlWrapper(removeUser);
