import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

const icons = [
  "icon-project",
  "icon-star",
  "icon-loading",
  "icon-puzzle",
  "icon-container",
  "icon-lightning",
  "icon-colors",
  "icon-hexagon",
];

const backgroundBoard = [
  "air",
  "ballons",
  "canyon",
  "circle",
  "clouds",
  "magnolia",
  "milkyway",
  "moon",
  "night",
  "palm",
  "rocks",
  "sea",
  "tree",
  "yacht",
];

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "set title for board"],
    },
    icon: {
      type: String,
      enum: [icons],
      default: "icon-project",
      required: [true, "set id for icon"],
    },
    background: {
      type: String,
      enum: [backgroundBoard],
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleMongooseError);

const Board = model("board", boardSchema);

export default Board;
