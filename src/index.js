// require('dotenv').config({path: './env'})  //isse bhi code run ho jayega bt ye acha approach nhii h so import krenge dotenv ko
import dotenv from  "dotenv"

import connectDB from "./db/index.js";

dotenv.config(
    {path: './env'}
)

connectDB()















/*
import express from "express"
const app = express()
// Connect to MongoDB

;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log("Server is running on port 3000");
            throw error
    })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw error
    }
})()
*/