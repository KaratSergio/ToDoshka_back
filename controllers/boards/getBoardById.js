import mongoose from "mongoose";
import Board from "../../models/board.js";
import HttpError from "../../helpers/HttpError.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const getBoardById = async (req, res) => {
  const { id } = req.params;

  console.log("Received board ID:", id);

  const objectId = new mongoose.Types.ObjectId(id);

  console.log("Converted to ObjectId:", objectId);

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
      $unwind: {
        path: "$columns",
        preserveNullAndEmptyArrays: true,
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
        "columns.tasks": { $ifNull: ["$columns.tasks", []] },
      },
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        icon: { $first: "$icon" },
        background: { $first: "$background" },
        owners: { $first: "$owners" },
        columns: { $push: "$columns" },
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
  ]);

  if (result.length === 0) {
    throw HttpError(404, `Board ${id} not found`);
  }

  // if (result.length > 1) {
  //   throw new Error("Multiple boards found for the same ID");
  // }

  res.json(result[0]);
};

export default ctrlWrapper(getBoardById);
