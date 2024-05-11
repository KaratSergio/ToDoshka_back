import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import Board from "../../models/board.js";
import mongoose from "mongoose";

const getAllUserBoards = async (req, res) => {
  const { _id } = req.user;

  const result = await Board.aggregate([
    {
      $match: { owners: new mongoose.Types.ObjectId(_id) },
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
      $project: {
        _id: 1,
        icon: 1,
        title: 1,
        owners: {
          $map: {
            input: "$owners",
            as: "owner",
            in: {
              avatarURL: "$$owner.avatarURL",
              name: "$$owner.name",
              email: "$$owner.email",
            },
          },
        },
      },
    },
  ]);
  res.json(result);
};

export default ctrlWrapper(getAllUserBoards);
