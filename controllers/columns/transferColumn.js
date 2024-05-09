import { Types } from "mongoose";
import Board from "../../models/board.js";

const transferColumn = async (req, res) => {
  const { id } = req.params;
  const columnId = new Types.ObjectId(id);
  const { source, destination } = req.body;

  await Board.findByIdAndUpdate(source.transferId, {
    $pull: { columns: { $in: [columnId] } },
  });

  await Board.findByIdAndUpdate(destination.transferId, {
    $push: { columns: { $each: [columnId], $position: destination.index } },
  });

  res.json({
    board: destination.transferId,
    message: `Column position has been changed to ${destination.index} on board ${destination.transferId}`,
  });
};

export default transferColumn;
