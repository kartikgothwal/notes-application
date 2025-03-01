import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types";
const usersSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      maxlength: 50,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", usersSchema);
export default User;
