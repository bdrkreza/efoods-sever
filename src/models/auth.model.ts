import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { IAuthDocument } from "../services/auth.service";

const AuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
      trim: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "merchant", "user"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "verified", "blocked"],
    },
    image: {
      type: String,
      default: "image",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "password should be greater than or equal 6 character!"],
    },
  },
  { timestamps: true }
);

AuthSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  this.password = hash;
  next();
});

AuthSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

AuthSchema.plugin(require("mongoose-beautiful-unique-validation"));

export const AuthUser = mongoose.model<IAuthDocument>(
  "admin",
  AuthSchema,
  "admin"
);
