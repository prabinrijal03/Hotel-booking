import mongoose from "mongoose";
import db from "../config/db.js";

const roomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    maxPeople:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    roomNumbers: [{number: Number, unavailableDates:{ type: [Date] } }],
}, 
{timestamps: true});
const roomModel = db.model('room', roomSchema);
export default roomModel;



