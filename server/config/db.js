import mongoose from "mongoose";
export const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log(`Database connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(401); //401 means a failure
    }
}

