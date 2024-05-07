const mongoose = require("mongoose");
const db = require("../config/db.js");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
  },
  currentbookings: [],
  allrooms: [],
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    range: [0, 5],
  },
  user_id: {
    type: String,
    required: true,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});
const hotelModel = db.model("hotel", hotelSchema);
module.exports = hotelModel;
