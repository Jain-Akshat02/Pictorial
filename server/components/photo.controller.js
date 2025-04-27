import Photo from "../models/Pictures.model.js";
import mongoose from "mongoose";
export const getPhotos = async (req,res)=>{
    try {
        const photos = await Photo.find({});
        res.status(200).json({sucess: true, message: "Photos fetched successfully", data: photos});
    } catch (error) {
        res.status(500).json({sucess: false, message: "Error fetching photos", error});
    }
}

export const createPhotos = async (req,res)=>{
    const photo = req.body;
    if(!photo.name || !photo.image){
     return res.status(400).json({sucess:false, message: "Provide All fields"})
    }
    const newPhoto = new Photo(photo)
 
    try {
     await newPhoto.save();
     res.status(200).json({sucess: true, message: "Photo uploaded successfully", data: newPhoto});
     
    } catch (error) {
     res.status(500).json({sucess: false, message: "Error uploading photo", error});
    }
 }

 export const updatePhoto = async (req,res)=>{
    const {id} = req.params;
    const photo = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({sucess:false, message: "Invalid ID"})
    }
    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(id, photo, {new: true}); 
        res.status(200).json({sucess: true, message: "Photo updated successfully", data: updatedPhoto});
    } catch (error) {
        res.status(500).json({sucess: false, message: "Error updating photo", error});
        
    }

 }

 export const deletePhoto = async (req,res) => {
    const {id} = req.params;
    const photo = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({sucess:false, message: "Invalid ID"})
    }
    try {
        const deletedPhoto = await Photo.findByIdAndDelete(id);
        if(!deletedPhoto){
            return res.status(404).json({sucess: false, message: "Photo not found"})
        }
        res.status(200).json({sucess: true, message: "Photo deleted successfully", data: deletedPhoto});
    } catch (error) {
        res.status(500).json({sucess: false, message: "Error deleting photo", error});
        
    }
 }