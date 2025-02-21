import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Connect to MongoDB

const connectDB = async () => {                     //async is used bcz database is in different continent
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Connected to MongoDB successfully !! DB HOST = ${connectionInstance.connection.host}`);  //by this we can see that connection of mongodb in console log message
    } catch (error) {
        console.error("MongoDB connection FAILED:", error.message);
        process.exit(1);
    }
}

export default connectDB;