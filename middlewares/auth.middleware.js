import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

export const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[2];
        }
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Not authorized, no token",
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({
            _id: decoded.userId,
        });
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Not authorized, user not found",
            });
        } 
        req.user = user;
        next();
        
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
        console.error("Error authorizing user:", error);
    }
}
