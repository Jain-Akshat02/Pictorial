import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
    name: {
        id: String,
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false, 
    },
    createdAt:{
        type: Date,
        default: Date.now
    },

    cloudinaryPublicId: {
        type: String,
        required: true
    },
    cloudinaryUrl: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},{
    timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema);
//products: that how mongoose handles pluralization of the model name
export default Photo;