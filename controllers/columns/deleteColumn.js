import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import Board from "../../models/board.js";
import Column from "../../models/column.js";

const deleteColumn = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  const resultDelete = await Column.findByIdAndDelete(id);
  if (!resultDelete) {
    throw HttpError(404, `Column with id=${id} not found`);
  }

  await Board.findByIdAndUpdate(
    resultDelete.board,
    { $pull: { columns: id } },
    { new: true }
  );
  res
    .status(200)
    .json({ _id: id, message: `Column ${id} successfully deleted` });
});

export default deleteColumn;
