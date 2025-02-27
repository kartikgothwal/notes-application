import mongoose, { Document, Schema } from 'mongoose';

interface INote extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  tag?: string;
  date?: Date;
}

const notesSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'general',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<INote>('notes', notesSchema);