import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

const boardSchema = new Schema(
// write the code here
);

boardSchema.post("save", handleMongooseError);

const Board = model("board", boardSchema);

export default Board;
