import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

/**
 * Establishes a connection to MongoDB using a URI
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
