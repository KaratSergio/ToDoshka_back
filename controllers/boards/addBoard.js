import Board from "../../models/board.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const addBoard = async (req, res) => {
  const { title, icon, background } = req.body;
  const { _id } = req.user;
  const result = await Board.create({ title, icon, background, owners: [_id] });

  res.status(201).json(result);
};

export default ctrlWrapper(addBoard);
