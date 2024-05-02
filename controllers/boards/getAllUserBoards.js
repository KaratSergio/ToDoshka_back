import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const getAllUserBoards = async (req, res) => {
  const { _id } = req.user;

  const result = await Board.aggregate([
    {
      $match: { $expr: { $in: [_id, "$owners"] } },
    },
    {
      $lookup: {
        from: "users",
        let: { owners: "$owners" },
        pipeline: [
          {
            $match: { $expr: { $in: ["$_id", "$$owners"] } },
          },
          {
            $project: {
              _id: 0,
              avatarURL: 1,
              name: 1,
              email: 1,
            },
          },
        ],
        as: "owners",
      },
    },
  ]);
  res.json(result);
};

export default ctrlWrapper(getAllUserBoards);
