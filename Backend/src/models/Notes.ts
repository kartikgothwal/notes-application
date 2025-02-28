import mongoose, { Document, Schema } from "mongoose";
import { INote } from "../types";

const notesSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "general",
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model<INote>("notes", notesSchema);
export default Notes;
