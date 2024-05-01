import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

const columnSchema = new Schema(


    
);

columnSchema.post("save", handleMongooseError);

const Column = model("column", columnSchema);

export default Column;
