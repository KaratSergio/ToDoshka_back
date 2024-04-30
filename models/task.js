import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

const taskSchema = new Schema(
// write the code here
);

taskSchema.post("save", handleMongooseError);

const Task = model("task", taskSchema);

export default Task;
