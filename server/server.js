// import dotenv from 'dotenv';
// import express from 'express';
// import {connectDB} from './config/db.js';
// import photoRoutes from './routes/photo.routes.js';
// import authRoutes from './routes/auth.router.js';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// // import { fileURLToPath } from "url";
// // import path from "path";
// dotenv.config();

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);
// const path = require('path');
// const __filename = require('url').fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const PORT = process.env.PORT || 5000;

// const app = express();

// app.use(express.json()); //allows us to accept JSON data
// app.use(express.urlencoded({ extended: true })); //allows us to accept URL encoded data
// app.use(cookieParser());

// // CORS configuration
// app.use(cors(
// //     {
// //     origin: 'http://localhost:5173',  // Your frontend URL
// //     credentials: true,
// //     // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
// //     allowedHeaders: ['Content-Type', 'Authorization']
// // }
// )); 

// // Security headers
// app.use((req, res, next) => {
//     res.setHeader(
//         'Content-Security-Policy',
//         "default-src 'self' http://localhost:*; connect-src 'self' http://localhost:*; img-src 'self' data: https: http:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
//     );
//     next();
// });

// // Static files
// app.use("/images", express.static(path.join(__dirname, "/public/images")));

// // Routes
// app.use('/photos', photoRoutes);
// app.use('/auth', authRoutes); // Add this line to use the auth routes

// // Handle favicon.ico request
// app.get('/favicon.ico', (req, res, next) => {
//     try {
//         res.status(200).sendFile(path.join(__dirname, 'public', 'favicon.ico'), (err) => {
//             if (err) {
//                 console.error('Error serving favicon:', err);
//                 res.status(404).end();
//             }
//         });
//     } catch (error) {
//         console.error('Favicon error:', error);
//         res.status(404).end();
//     }
// });

// // Handle root path
// app.get('/', (req, res) => {
//    console.log(`Server listening on port ${port}`);
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error('Server error:', err);
//     res.status(500).json({
//         status: 'error',
//         message: 'Internal server error'
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     connectDB();  
// });


import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import photoRoutes from './routes/photo.routes.js';
import authRoutes from './routes/auth.router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// The following lines were removed because 'import.meta.url' is not available in CommonJS modules
// import { fileURLToPath } from "url";
// import path from "path";

// ADDED: Require the 'path' module using CommonJS syntax
const path = require('path');

// The following lines were removed because __filename and __dirname are global variables in CommonJS modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self' http://localhost:*; connect-src 'self' http://localhost:*; img-src 'self' data: https: http:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    );
    next();
});

// __dirname is now a global CommonJS variable, no change to logic needed here
app.use("/images", express.static(path.join(__dirname, "/public/images")));

app.use('/photos', photoRoutes);
app.use('/auth', authRoutes);

app.get('/favicon.ico', (req, res, next) => {
    try {
        // __dirname is now a global CommonJS variable, no change to logic needed here
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

app.get('/', (req, res) => {
   console.log(`Server listening on port ${PORT}`); // Corrected variable name from 'port' to 'PORT'
   res.send('Server is running!'); // ADDED: Send a response for the root path
});

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