import mongoose, { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for column"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: "true",
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: "true",
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
      },
    ],
  },
  { versionKey: false, timestamps: false }
);

columnSchema.post("save", handleMongooseError);

const Column = model("column", columnSchema);

export default Column;
