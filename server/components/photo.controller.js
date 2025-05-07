import Photo from "../models/Pictures.model.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
export const getPhotos = async (req,res)=>{
    try {
        const photos = await Photo.find({});
        res.status(200).json({success: true, message: "Photos fetched successfully", data: photos});
    } catch (error) {
        res.status(500).json({success: false, message: "Error fetching photos", error});
    }
}

export const createPhotos = async (req,res,cloudinaryResponse)=>{
    try {
        const {title, description, image} = req.body;
        const cloudinaryInfo = cloudinaryResponse;
    if(!title){
     return res.status(400).json({success:false, message: "Provide All fields"})
    }

    
    console.log("---Creating new photo with user:---", req.user._id);

    const newPhoto = new Photo({
        name: title,
        image: image,
        description: description,
        cloudinaryPublicId: cloudinaryInfo.public_id,
        cloudinaryUrl: cloudinaryInfo.secure_url,
        width: cloudinaryInfo.width,
        height: cloudinaryInfo.height,
        userId: req.user._id,
        user: req.user._id
    })
    console.log("--------puclicId by akshu-------",cloudinaryInfo.public_id);
 
    
    try {
        const savedPhoto = await newPhoto.save();
        console.log("Photo saved successfully:", savedPhoto);
        
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

 export const updatePhoto = async (req,res)=>{
    const {id} = req.params;
    const photo = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false, message: "Invalid ID"})
    }
    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(id, photo, {new: true}); 
        res.status(200).json({success: true, message: "Photo updated successfully", data: updatedPhoto});
    } catch (error) {
        res.status(500).json({success: false, message: "Error updating photo", error});
    }
 }

 export const deletePhoto = async (req,res) => {
    const {id} = req.params;
    const photo = req.body;

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