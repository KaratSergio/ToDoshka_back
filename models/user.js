import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";
import tokenAuth from "../helpers/tokenAuth.js";
import comparePassword from "../helpers/comparePassword.js";
import { hashPassword } from "../helpers/hashPassword.js";
// import setUpdateSetting from "../helpers/setUpdateSetting.js";

import { email, password } from "../constants/regExp.js";

import { themes } from "../constants/uiConstants.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      // minlength: 2,
      // required: true,
      default: "User",
    },
    password: {
      type: String,
      match: password,
      // minlength: 8,
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
    // token: {
    //   type: String,
    //   default: "",
    // },
    avatarURL: {
      type: String,
      default: "",
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   default: "",
    // },
    accessToken: {
      type: String,
      default: null,
    },
  },
  { version: false, timestamps: true }
);

userSchema.methods.comparePassword = comparePassword;

userSchema.methods.tokenAuth = tokenAuth;

userSchema.post("save", handleMongooseError);

// userSchema.pre("findOneAndUpdate", setUpdateSetting);

// userSchema.post("findOneAndUpdate", handleMongooseError);

userSchema.pre("save", hashPassword);

// userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

export default User;
