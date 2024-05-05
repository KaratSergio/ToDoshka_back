import { Schema, model } from "mongoose";

import tokenAuth from "../helpers/tokenAuth.js";
import { hashPassword } from "../helpers/hashPassword.js";
import comparePassword from "../helpers/comparePassword.js";
import handleMongooseError from "../helpers/handleMongooseError.js";

import { email, password } from "../constants/regExp.js";
import { themes } from "../constants/uiConstants.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "User",
    },
    password: {
      type: String,
      match: password,
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
    avatarURL: {
      type: String,
      default: "",
    },
    accessToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

userSchema.methods.comparePassword = comparePassword;

userSchema.methods.tokenAuth = tokenAuth;

userSchema.post("save", handleMongooseError);

userSchema.pre("save", hashPassword);

const User = model("user", userSchema);

export default User;
