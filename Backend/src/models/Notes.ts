import mongoose, { Document, Schema } from "mongoose";
import { INote } from "../types";

const notesSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "general",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notes = mongoose.model<INote>("notes", notesSchema);
export default Notes;
