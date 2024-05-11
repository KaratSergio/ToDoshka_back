import Board from "../../models/board.js";
import Column from "../../models/column.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import BadRequestError from "../../helpers/BadRequestError.js";

const updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.background = req.file.path;
    }

    const result = await Board.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!result) {
      throw BadRequestError(`Board ${id} is not found`);
    }

    const columns = await Column.find({ board: id });

    const responseData = {
      ...result.toObject(),
      columns: columns,
    };

    res.json(responseData);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default ctrlWrapper(updateBoard);
