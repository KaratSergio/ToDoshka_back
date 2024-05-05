import BadRequestError from "../../helpers/badRequestError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import HttpError from "../../helpers/httpError.js";

import boardSchemas from "../../schemas/schemaBoard.js";

import Board from "../../models/board.js";
import User from "../../models/user.js";

const removeUser = async (req, res, next) => {
  try {
    const { value, error } = boardSchemas.ownersSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw new BadRequestError("Validation failed", error.details);
    }
    const { email } = value;
    const { id } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(400, "User does not exist");
    }

    const board = await Board.findById(id);
    if (!board) {
      throw new HttpError(404, "Board not found");
    }
    if (!board.owners.includes(user._id)) {
      throw new HttpError(
        400,
        `User ${user.email} is not working with board ${id}`
      );
    }
    if (board.owners.length < 2) {
      throw new HttpError(
        409,
        `User ${user.email} is the latest owner of the board ${id}. It's preferable to delete the board instead of this action`
      );
    }
    await Board.findByIdAndUpdate(id, { $pull: { owners: user._id } });
    res.json({
      message: `User ${user.email} has successfully disconnected from board ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

export default ctrlWrapper(removeUser);
