import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDb =async ()=>{
    try {
        // console.log("Environment Variables:", process.env);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB is Connected ${conn.connection.host}`)
    } catch (error) {
        console.log("MongoDb can't be connected")
    }
}



