import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", true);

export const dbConnection = async () => {
  const mongodbURL = process.env.MONGODB_URL || "mongodb://localhost:27017";
  try {
    //connecting to the database
    await mongoose.connect(mongodbURL);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
