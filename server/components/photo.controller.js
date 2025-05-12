import Photo from "../models/Pictures.model.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/User.models.js";


export const getPhotos = async (req,res)=>{
    try {
        const photos = await Photo.find({})
            .sort({createdAt: -1})
            .populate('user', 'username')
        res.status(200).json({success: true, message: "Photos fetched successfully", data: photos});
    } catch (error) {
        res.status(500).json({success: false, message: "Error fetching photos", error});
    }
}
export const getUserPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({user: req.user._id})
                .sort({createdAt: -1})
                .populate('user', 'username');
        
       res.status(200).json({
            success: true,
            message: "Photos fetched Successfully",
            data: photos
        });
    } catch (error) {
        console.error("Error in getUserPhotos:", error); // Debug log
        res.status(500).json({success: false, message: "Error fetching user photos"})
    }
}

export const createPhotos = async (req,res,cloudinaryResponse)=>{
    try {
        const {title, image} = req.body;
        const cloudinaryInfo = cloudinaryResponse;
    if(!title){
     return res.status(400).json({success:false, message: "Provide All fields"})
    }

    // Get user details to create readable userId
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({success: false, message: "User not found"});
    }

    const newPhoto = new Photo({
        name: title,
        image: image,
        cloudinaryPublicId: cloudinaryInfo.public_id,
        cloudinaryUrl: cloudinaryInfo.secure_url,
        width: cloudinaryInfo.width,
        height: cloudinaryInfo.height,
        user: req.user._id,
        userId: `${user.username}_${Date.now().toString().slice(-6)}`
    });
 
    
    try {
        const savedPhoto = await newPhoto.save();
        // console.log("Photo saved successfully:", savedPhoto);
        
        return res.status(200).json({
            success: true,
            message: "Photo uploaded successfully",
            data: savedPhoto
        });
    } catch (saveError) {
        console.error("Error saving photo:", saveError);
        return res.status(500).json({
            success: false,
            message: "Error saving photo to database",
            error: saveError.message
        });
    }
     
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Error uploading photo",
        error: error.message
    });
    }
 }

 export const deletePhoto = async (req,res) => {
    const {id} = req.params;
    // const photo = req.body;
    const userId = req.user._id;
    console.log("userId in deletePhoto",userId);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false, message: "Invalid ID"})
    }
    try {
        const deletedPhoto = await Photo.findByIdAndDelete(id);
        if(!deletedPhoto){
            return res.status(404).json({success: false, message: "Photo not found"})
        }
        res.status(200).json({success: true, message: "Photo deleted successfully", data: deletedPhoto});
    } catch (error) {
        res.status(500).json({success: false, message: "Error deleting photo", error});
        
    }
 }