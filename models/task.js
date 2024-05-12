import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

import { priorities } from "../constants/uiConstants.js";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for task"],
    },
    description: {
      type: String,
      required: [true, "Set description for task"],
    },
    priority: {
      type: String,
      enum: priorities,
      required: [true, "Set priority for task"],
      default: "Without priority",
    },
    deadline: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: "true",
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: "true",
    },
  },
  { versionKey: false, timestamps: false }
);

taskSchema.post("save", handleMongooseError);

const Task = model("task", taskSchema);

export default Task;
