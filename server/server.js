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

// CORS configuration
app.use(cors({
    origin: '/*', 
    credentials: true
})); 

// Security headers
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    );
    next();
});

// Static files
app.use("/images", express.static(path.join(__dirname, "/public/images")));

// Routes
app.use('/photos', photoRoutes);
app.use('/auth', authRoutes); // Add this line to use the auth routes

// Default route should be last
app.get('*', (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => {
    connectDB();  
});

