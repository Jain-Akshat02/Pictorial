import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {connectDB} from './config/db.js';
import photoRoutes from './routes/photo.routes.js';
import authRoutes from './routes/auth.router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.PORT


const app = express();
app.use(express.json()); //allows us to accept JSON data
app.use(express.urlencoded({ extended: true })); //allows us to accept URL encoded data
app.use(cookieParser());
app.use(cors(
    {origin: '/*', 
     credentials: true}
)); 



app.use("/images", express.static(path.join(__dirname, "/public/images")));
app.use('/photos', photoRoutes);
app.use('/auth', authRoutes); // Add this line to use the auth routes


app.listen(PORT, () => {
    connectDB();  
});

