import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";
import setUpdateSetting from "../helpers/setUpdateSetting.js";

import { email, password } from "../constants/regExp.js";

import { themes } from "../constants/uiConstants.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: true,
    },
    password: {
      type: String,
      match: password,
      minlength: 8,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: email,
      required: [true, "Email is required"],
      unique: true,
    },
    theme: {
      type: String,
      enum: themes,
      default: "dark",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
    },
  },
  { version: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

userSchema.pre("findOneAndUpdate", setUpdateSetting);

userSchema.post("findOneAndUpdate", handleMongooseError);

const User = model("user", userSchema);

export default User;
