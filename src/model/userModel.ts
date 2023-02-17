import  { model, Schema } from "mongoose";
import { IUser } from "../utils/interface";


const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;