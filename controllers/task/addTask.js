import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import Task from "../../models/task.js";
import Column from "../../models/column.js";

const addTask = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { column } = req.body;

  const newTask = await Task.create({ ...req.body, owner });
  if (!newTask) {
    throw HttpError(404, "Not found");
  }

  await Column.findByIdAndUpdate(
    column,
    {
      $push: { tasks: newTask._id },
    },
    { new: true }
  );

  res.status(201).json({
    _id: newTask._id,
    title: newTask.title,
    description: newTask.description,
    priority: newTask.priority,
    deadline: newTask.deadline,
    column: newTask.column,
  });
});

export default addTask;
