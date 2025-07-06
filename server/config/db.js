import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected: ${mongoose.connection.host}`);

        // Add connection event listeners
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        //hello world
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

