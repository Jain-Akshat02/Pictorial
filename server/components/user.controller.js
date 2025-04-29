import User from '../models/User.models.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; 
dotenv.config();


export const registerUser = async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                 message: 'User already exists'
             });
        }
        const UserModel = new User({
            username,
            email,
            password,
        })
        UserModel.password = await bcrypt.hash(password, 10);
        await UserModel.save();
        res.status(203).json()({success:true,  message: 'User created successfully', user: UserModel });

    } catch (error) {
        res.status(400).json({ success: false , message: error.message });   
    }
}

export const loginUser = async (req, res) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(200).json({
            message: 'Login successfull',
            success: true,
            jwtToken,
            email: user.email,
            userId: user._id,
            username: user.username
        });
    } catch (error) {
        res.status(400).json({ success: false , message: error.message });   
        
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('jwtToken');
        res.status(200).json({ message: 'Logout successfull' });
    } catch (error) {
        res.status(400).json({ success: false , message: error.message });   
    }
}