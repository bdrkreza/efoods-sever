import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { IUserDocument } from "./../services/auth.service";

const UserSchema = new mongoose.Schema<IUserDocument>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imageURL: { type: String, required: true },
  role: { type: String, required: true },
});

// hash password
UserSchema.pre<IUserDocument>("save", async function () {
  if (this.isModified("password")) {
    if (this.password) {
      const hash = await bcrypt.hashSync(this.password.toString(), 10);
      this.password = hash;
    }
  }
});

// check if password matches the hash password
UserSchema.methods.matchesPassword = function (password: string) {
  if (!this.password) {
    return false;
  }
  return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model("User", UserSchema);
