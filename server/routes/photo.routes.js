import express, { response } from 'express';
import {getPhotos, createPhotos, updatePhoto, deletePhoto} from '../components/photo.controller.js';
import { upload } from "../middlewares/multer.middlewares.js";
import { fileURLToPath } from "url";
import path from "path";
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Photo from '../models/Pictures.model.js';
import { verifyUser } from '../middlewares/verifyUser.middleware.js';


    express.json(),
    router.get("/", getPhotos),
    router.put('/:id', updatePhoto )
    router.post("/", createPhotos)
    router.delete("/:id", deletePhoto)
    

    //route to upload image
    // This route handles the image upload using multer middleware
    router.post("/upload-image", upload.single("image"), async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded" });
            }
            // Get the local file path
        const localFilePath = path.join(req.file.destination, req.file.filename);
        // console.log(localFilePath);
        // Upload the file to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

        // Check if the upload was successful
        if (!cloudinaryResponse) {
            console.log("Failed to upload file to Cloudinary");
            return res.status(500).json({ success: false, message: "Failed to upload file to Cloudinary" });

        }   
            
            res.status(200).json({
                success: true,
                message: "File uploaded successfully",
                filePath: `/images/${req.file.filename}`, // Path to the uploaded file
                response: cloudinaryResponse, // Cloudinary response
                
            });
            console.log("we are here");
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    })



export default router