const mongoose = require("mongoose");
const db = require("../config/db.js");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    hotelid: {
      type: String,
    },
    photos: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    roomNumbers: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const roomModel = db.model("room", roomSchema);
module.exports = roomModel;
