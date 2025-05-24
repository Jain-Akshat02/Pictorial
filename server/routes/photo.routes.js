import express from "express";
import {
  getPhotos,
  createPhotos,
  deletePhoto,
  getUserPhotos,
} from "../components/photo.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { fileURLToPath } from "url";
import path from "path";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";
import multer from 'multer';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//get all photos
router.get("/", getPhotos)
  //protected routes
  // router.put('/:id',verifyUser, updatePhoto )
  router.delete("/:id", verifyUser, deletePhoto);
router.get("/my-photos", verifyUser, getUserPhotos);

//create photos
router.post("/", createPhotos);

//route to upload image
// This route handles the image upload using multer middleware
router.post("/upload-image", verifyUser, (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ success: false, message: "File size cannot exceed 10MB" });
      }
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      console.error("General upload error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file" });
    }
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }
      // Get the local file path
      const localFilePath = path.join(req.file.destination, req.file.filename);
      const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

      // Checking if the upload was successful
      if (!cloudinaryResponse) {
        console.log("Failed to upload file to Cloudinary");
        return res
          .status(500)
          .json({
            success: false,
            message: "Failed to upload file to Cloudinary",
          });
      }
      // console.log("route 1 code responsed");
      await createPhotos(req, res, cloudinaryResponse);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
});

export default router;
