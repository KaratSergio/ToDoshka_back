import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import Board from "../../models/board.js";
import Column from "../../models/column.js";

const deleteColumn = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const column = await Column.findById(id);
  if (!column) {
    throw HttpError(404, `Column with id=${id} not found`);
  }

  const board = await Board.findById(column.board);
  if (!board) {
    throw HttpError(404, `Board for column with id=${id} not found`);
  }

  const isOwner = board.owners.some((ownerId) => ownerId.equals(user._id));
  if (!isOwner) {
    throw HttpError(403, `You are not authorized to delete this column`);
  }

  const columnDelete = await Column.findByIdAndDelete(id);
  await Board.findByIdAndUpdate(
    columnDelete.board,
    { $pull: { columns: id } },
    { new: true }
  );
  res
    .status(200)
    .json({ _id: id, message: `Column ${id} successfully deleted` });
});

export default deleteColumn;
