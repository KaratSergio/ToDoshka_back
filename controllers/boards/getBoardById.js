import { Types } from "mongoose";

import Board from "../../models/board.js";

import HttpError from "../../helpers/httpError.js";

import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const getBoardById = async (req, res) => {
  const { id } = req.params;
  const objectId = Types.ObjectId(id);

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
        let: { owners: "$owners" },
        pipeline: [
          { $match: { $expr: { $in: ["$_id", "$$owners"] } } },
          { $project: { _id: 0, avatarURL: 1, name: 1, email: 1 } },
        ],
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
