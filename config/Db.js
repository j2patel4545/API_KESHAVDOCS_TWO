import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const DatabaseConnection = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) throw new Error("MONGO_URI is missing in .env");

    // Just pass the URI — no extra options needed
    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
