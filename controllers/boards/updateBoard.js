import Board from "../../models/board.js";

import boardSchemas from "../../schemas/schemaBoard.js";

import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import BadRequestError from "../../helpers/BadRequestError.js";

const updateBoard = async (req, res) => {
  try {
    const { value, error } = boardSchemas.editBoardSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw new BadRequestError("Validation failed", error.details);
    }

    const { id } = req.params;
    const result = await Board.findByIdAndUpdate(id, value, {
      new: true,
      upsert: false,
    });
    if (!result) {
      throw new BadRequestError(`Board ${id} is not found`);
    }
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default ctrlWrapper(updateBoard);
