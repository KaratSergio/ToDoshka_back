import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import Board from "../../models/board.js";

const getAllUserBoards = async (req, res) => {
  const { _id } = req.user;

  const result = await Board.aggregate([
    {
      $match: { assignees: _id },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignees",
        foreignField: "_id",
        as: "assignees",
      },
    },
    {
      $project: {
        _id: 1,
        icon: 1,
        title: 1,
        assignees: {
          $map: {
            input: "$assignees",
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
