import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateOptions } from "./hooks.js";
import { emailRegExp } from "../constants/user-constants.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      match: emailRegExp,
      default: null,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      default: null,
      required: [true, "Password is required"],
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    verificationToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateOptions);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
