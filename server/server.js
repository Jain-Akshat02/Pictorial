import express from 'express';
import {connectDB} from './config/db.js';
import photoRoutes from './routes/photo.routes.js';
import authRoutes from './routes/auth.router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from "url";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const __filename = require('url').fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); //allows us to accept JSON data
app.use(express.urlencoded({ extended: true })); //allows us to accept URL encoded data
app.use(cookieParser());

// CORS configuration
app.use(cors(
    {
        origin: 'https://pictorial-ebon.vercel.app/',
        credentials: true
    }
)); 

// Security headers
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self' http://localhost:*; connect-src 'self' http://localhost:*; img-src 'self' data: https: http:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    );
    next();
});

// Static files
app.use("/images", express.static(path.join(__dirname, "/public/images")));

// Routes
app.use('/photos', photoRoutes);
app.use('/auth', authRoutes); // Add this line to use the auth routes

// Handle favicon.ico request
app.get('/favicon.ico', (req, res, next) => {
    try {
        res.status(200).sendFile(path.join(__dirname, 'public', 'favicon.ico'), (err) => {
            if (err) {
                console.error('Error serving favicon:', err);
                res.status(404).end();
            }
        });
    } catch (error) {
        console.error('Favicon error:', error);
        res.status(404).end();
    }
});

// Handle root path
app.get('/', (req, res) => {
    res.status(200).json({
        activeStatus: true,
        status: 'success',
        message: 'Welcome to the Photo App API'
    });
   console.log(`Server listening on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();  
});