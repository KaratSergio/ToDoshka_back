import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import Task from "../../models/task.js";
import Board from "../../models/board.js";
import Column from "../../models/column.js";

const deleteBoard = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Board ${id} not found`);
  }

  if (result.columnOrder && result.columnOrder.length !== 0) {
    result.columnOrder.forEach(async (columnId) => {
      const { taskOrder } = await Column.findByIdAndDelete(columnId);
      if (taskOrder && taskOrder.length !== 0) {
        await Task.deleteMany({ _id: { $in: taskOrder } });
      }
    });
  }
  res.status(200).json({
    message: `Board ${id} deleted successfully`,
    data: result,
  });
};

export default ctrlWrapper(deleteBoard);
