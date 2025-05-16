import jwt from 'jsonwebtoken';
import User from '../models/User.models.js';

export const verifyUser = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Authorization header is missing' });
    }

    const token = authHeader.split(" ")[1];
    // console.log("Received token:", token); // Debug log

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("Decoded token:", decoded); // Debug log
        const user = await User.findById(decoded.id || decoded._id);
        // console.log("Found user:", user); // Debug log
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        req.user = {
            _id: user._id,
            userId: user._id.toString(),
            username: user.username,
            ...user.toObject()
        }; // Attach the user to the request object
        next();
    } catch (error) {
        console.error("Auth error:", error); // Debug log
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}