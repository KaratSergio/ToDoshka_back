import Board from "../../models/board.js";

import boardSchemas from "../../schemas/schemaBoard.js";

import BadRequestError from "../../helpers/badRequestError.js";

import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const addBoard = async (req, res) => {
  const { value, error } = boardSchemas.addBoardSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    throw new BadRequestError("Validation failed", error.details);
  }
  const { _id } = req.user;
  const result = await Board.create({ ...value, owners: [_id] });

  res.status(201).json(result);
};

export default ctrlWrapper(addBoard);
