import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
    name: {
        id: String,
        type: String,
        required: true
    },
    image: {
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema);
//products: that how mongoose handles pluralization of the model name
export default Photo;