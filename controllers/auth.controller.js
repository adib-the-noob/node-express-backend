import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js" 

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const jwt_token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        return res.status(201).json({ 
            'status': 'success',
            'message': 'User created successfully',
            'data': {
                'user': {
                    'id': newUser._id,
                    'name': newUser.name,
                    'email': newUser.email,
                },
                'token': jwt_token,
            }
         });
    } catch (error) {
        console.error("Error during sign up:", error);
        return res.status(500).json({ message: "Internal server error" });
    } 
}


export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const jwt_token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        return res.status(200).json({ 
            'status': 'success',
            'message': 'User logged in successfully',
            'data': {
                'user': {
                    'id': user._id,
                    'name': user.name,
                    'email': user.email,
                },
                'token': jwt_token,
            }
         });
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error",
            error: error.message,
         });
    }
}