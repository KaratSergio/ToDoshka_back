import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import HttpError from "../../helpers/HttpError.js";

import Column from "../../models/column.js";

const updateColumn = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "Missing field");
  }

  const result = await Column.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Column  id=${id} not found`);
  }
  res.json(result);
});

export default updateColumn;
