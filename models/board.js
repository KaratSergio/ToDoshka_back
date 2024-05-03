import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

import { icons, backgrounds } from "../constants/uiConstants.js";

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "set title for board"],
    },
    icon: {
      type: String,
      enum: icons,
      default: "icon-project",
      required: [true, "set id for icon"],
    },
    background: {
      type: String,
      enum: backgrounds,
      default: "moon",
    },
    owners: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleMongooseError);

const Board = model("board", boardSchema);

export default Board;
