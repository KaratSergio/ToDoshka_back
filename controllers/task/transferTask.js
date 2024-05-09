import { Types } from "mongoose";

import Task from "../../models/task.js";
import Column from "../../models/column.js";

const transferTask = async (req, res) => {
  const { id } = req.params;
  const { source, destination } = req.body;

  const taskId = new Types.ObjectId(id);
  //   const columnId = new Types.ObjectId(destination.columnId);

  await Column.findByIdAndUpdate(source.transferId, {
    $pull: { tasks: taskId },
  });

  const updatedDestinationColumn = await Column.findByIdAndUpdate(
    destination.transferId,
    { $push: { tasks: { $each: [taskId], $position: destination.index } } },
    { new: true }
  );

  await Task.findByIdAndUpdate(taskId, { column: destination.transferId });

  res.json({
    board: updatedDestinationColumn.board,
    message: `Task position has been changed to ${destination.index} in column ${destination.transferId}`,
  });
};

export default transferTask;
