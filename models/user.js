import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

import { email, password } from "../constants/regExp.js";

const userSchema = new Schema(
// write the code here
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

export default User;
