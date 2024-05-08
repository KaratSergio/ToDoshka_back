import mongoose from "mongoose";
import Board from "../../models/board.js";
import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const getBoardById = async (req, res) => {
  const { id } = req.params;
  const objectId = new mongoose.Types.ObjectId(id);

  const result = await Board.aggregate([
    { $match: { _id: objectId } },
    {
      $lookup: {
        from: "columns",
        localField: "_id",
        foreignField: "board",
        as: "columns",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owners",
        foreignField: "_id",
        as: "owners",
      },
    },
    {
      $lookup: {
        from: "tasks",
        localField: "columns._id",
        foreignField: "column",
        as: "columns.tasks",
      },
    },
    {
      $addFields: {
        "columns.tasks": {
          $ifNull: ["$columns.tasks", []],
        },
      },
    },
  ]);

  if (result.length === 0) {
    throw HttpError(404, `Board ${id} not found`);
  }
  res.json(result[0]);
};

export default ctrlWrapper(getBoardById);
