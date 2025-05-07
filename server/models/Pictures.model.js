import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false, 
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userId: {
        type: String,
        required: true,
        default: Date.now()+ Math.random(1,5).toString(36).substring(2, 15)
    }
},{
    timestamps: true
});



const Photo = mongoose.model('Photo', photoSchema);
//products: that how mongoose handles pluralization of the model name
export default Photo;