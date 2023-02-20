import mongoose, { model, Schema } from "mongoose";
import { INote } from "../utils/interface";

const NoteSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Title: { type: String, required: true ,  },
    Description: { type: String },
    Body: { type: String },
  },
  { timestamps: true }
);

const Note = model<INote>("Note", NoteSchema);

export default Note;
