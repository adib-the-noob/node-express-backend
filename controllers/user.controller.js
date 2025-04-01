import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");    
        res.status(200).json({
            status: "success",
            message: "Users retrieved successfully",
            data: {
                users,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
        console.error("Error retrieving users:", error);
    }
}


export const getUser = async (req, res) => {
    try {
        const users = await User.findById(req.params.id).select("-password");
        if (!users) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        res.status(200).json({
            status: "success",
            message: "User retrieved successfully",
            data: {
                users,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
        console.error("Error retrieving users:", error);
    }
}