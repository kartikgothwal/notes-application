import mongoose, { Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export interface INote extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  tag?: string;
  date?: Date;
}
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  image?: string;
}
