import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name must be at most 50 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        minlenghth: [5, "Email must be at least 5 characters long"],
        maxlength: [100, "Email must be at most 100 characters long"],
        match: [
            /\S+@\S+\.\S+/,
            "Please enter a valid email address",
        ],
    }, 
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [100, "Password must be at most 100 characters long"],
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;