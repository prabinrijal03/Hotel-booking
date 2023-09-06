import mongoose from "mongoose";
import db from "../config/db.js";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
}, 
{timestamps: true});
const userModel = db.model('user', userSchema);
export default userModel;



