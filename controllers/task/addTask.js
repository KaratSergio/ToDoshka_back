import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import Task from "../../models/task.js";
import Column from "../../models/column.js";

// додавання (створення) картки
const addTask = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { column, title, description, priority, deadline } = req.body;

  const newTask = await Task.create({title, description, priority, deadline, owner});
  if (!newTask) {
    throw HttpError(404, `not found`);
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
    updatedAt: newTask.updatedAt,
  });
});

export default addTask;

//1. ств

// // Приклади IVETTA
// // $push
// data = await Diary.findByIdAndUpdate(
//     foundedDiary._id,
//     {
//       $push: { doneExercises: { exercise, time, calories } },
//     },
//     { new: true }
//   )
//  // $pull
//  data = await Diary.findByIdAndUpdate(
//        foundedDiary._id,
//        {
//          $pull: { doneExercises: { _id: doneExerciseId } },
//        },
//        { new: true })
