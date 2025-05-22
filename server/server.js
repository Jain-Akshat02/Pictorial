// import dotenv from 'dotenv'; // Keep this for now, less likely the cause
import express from 'express';
// import {connectDB} from './config/db.js'; // Comment this and the connectDB() call below
// import photoRoutes from './routes/photo.routes.js';
// import authRoutes from './routes/auth.router.js';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { fileURLToPath } from "url"; // Keep these for __dirname
// import path from "path";

// dotenv.config(); // Keep this for now

// const __filename = fileURLToPath(import.meta.url); // Keep these for __dirname
// const __dirname = path.dirname(__filename); // Keep these for __dirname

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser()); // Comment this
// app.use(cors()); // Comment this and its config

// ... security headers (keep for now, less likely the cause)

// app.use("/images", express.static(path.join(__dirname, "/public/images")));

// app.use('/photos', photoRoutes); // Comment this
// app.use('/auth', authRoutes); // Comment this

// Keep favicon and root for basic server test
// app.get('/favicon.ico', ...);
// app.get('/', ...);

// app.use((err, req, res, next) => { ... });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // connectDB(); // Comment this
});