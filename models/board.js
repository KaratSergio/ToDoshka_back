import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

const boardSchema = new Schema();

boardSchema.post("save", handleMongooseError);

const Board = model("board", boardSchema);

export default Board;
