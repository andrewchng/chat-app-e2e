// database.ts
import mongoose from "mongoose";

const mongoURI: string = process.env.MONGODB_URI!;

export async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoURI, {});
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", (err as Error).message);
    process.exit(1); // Exit application on connection error
  }
}
