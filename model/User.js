const mongoose = require('mongoose');
const db = require('../config/db.js');

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      required: false,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  { timestamps: true }
);
const userModel = db.model("user", userSchema);
module.exports = userModel;
