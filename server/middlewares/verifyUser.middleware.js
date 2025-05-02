import jwt from 'jsonwebtoken';
import  User  from '../models/User.models.js';

export const verifyUser = async (requestAnimationFrame, res, next) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user; // Attach the user to the request object
    } catch (error) {
        return res.status(401).json({success: false},{ message: 'Invalid token' });
        
    }
}