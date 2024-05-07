const mongoose = require("mongoose");
const db = require("../config/db.js");

const bookingSchema = new mongoose.Schema(
  {
    hotel: { type: String, required: true },
    status: { type: String, required: true, default: "booked" },
    hotelid: { type: String, required: true },
    userid: { type: String, required: true },
    roomid: { type: String, required: true },
    fromdate: { type: String, required: true },
    todate: { type: String, required: true },
    totalamount: {
      type: Number,
      required: true,
    },
    totaldays: {
      type: Number,
      required: true,
    },
    photos: { type: [String], required: true },
  },
  { timestamps: true }
);

const bookingModel = db.model("bookings", bookingSchema);

module.exports = bookingModel;
