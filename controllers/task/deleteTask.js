import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import Task from "../../models/task.js";
import Column from "../../models/column.js";

const deleteTask = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  const resultDelete = await Task.findByIdAndDelete(id);
  if (!resultDelete) {
    throw HttpError(404, `Task ${id} not found`);
  }

  await Column.findByIdAndUpdate(
    resultDelete.column,
    { $pull: { tasks: id } },
    { new: true }
  );

  res.status(200).json({
    _id: id,
    column_id: resultDelete.column,
    message: `Task ${id} successfully deleted`,
  });
});

export default deleteTask;
