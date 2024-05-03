import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import Board from "../../models/board.js";
import Column from "../../models/column.js";

const addColumn = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { board: boardId } = req.body;

  const newColumn = await Column.create({ ...req.body, owner });
  if (!newColumn) {
    throw HttpError(404, "Not found");
  }

  const updatedBoard = await Board.findByIdAndUpdate(
    boardId,
    {
      $push: { columns: newColumn._id },
    },
    { new: true }
  );

  if (!updatedBoard) {
    throw new HttpError(404, `Board ${id} not found`);
  }

  res.status(201).json({
    _id: newColumn._id,
    title: newColumn.title,
    board: newColumn.board,
    tasks: newColumn.tasks,
  });
});

export default addColumn;
