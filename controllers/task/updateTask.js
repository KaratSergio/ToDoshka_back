import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import Task from "../../models/task.js";

const updateTask = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  // const { _id: owner } = req.user; // якщо додаєм

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "Missing field");
  }
  //  const result = await Task.findByIdAndUpdate(id, owner, req.body, { new: true });

  const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Task ${id} not found`);
  }
  res.json(result);
});

export default updateTask;
