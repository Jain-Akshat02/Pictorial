import express from 'express';
import {getPhotos,createPhotos,updatePhoto,deletePhoto,getUserPhotos} from '../components/photo.controller.js';
import { upload } from "../middlewares/multer.middlewares.js";
import { fileURLToPath } from "url";
import path from "path";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { verifyUser } from '../middlewares/verifyUser.middleware.js';


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


    //get all photos
    router.get("/", getPhotos),

    //protected routes
    router.put('/:id',verifyUser, updatePhoto )
    router.delete("/:id", verifyUser ,deletePhoto)
    router.get("/my-photos", verifyUser, getUserPhotos)
    
    //create photos
    router.post("/", createPhotos)

    //route to upload image
    // This route handles the image upload using multer middleware
    router.post("/upload-image", verifyUser, upload.single("image"), async (req, res) => {
        try {
            console.log("User data in upload route:",{
                userId: req.user.userId,
                id: req.user._id,
                user: req.user

            })
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded" });
            }
            // Get the local file path
        const localFilePath = path.join(req.file.destination, req.file.filename);
        console.log(localFilePath);
        // Upload the file to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

        // Check if the upload was successful
        if (!cloudinaryResponse) {
            console.log("Failed to upload file to Cloudinary");
            return res.status(500).json({ success: false, message: "Failed to upload file to Cloudinary" });

        }  
        console.log("route 1 code responsed");
        await createPhotos(req, res, cloudinaryResponse); 
        console.log("--route 2 code responsed--");
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    })



export default router
