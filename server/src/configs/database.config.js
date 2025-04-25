import mongoose from "mongoose"

import { MONGODB_URI } from "./server.config.js"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully", conn.connection.host);
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};

export default connectDB