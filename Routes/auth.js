const express = require("express");
const {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controllers/authController.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/forgotPassword", forgotPassword);

router.post("/verifyOtp", verifyOtp);

router.post("/resetPassword", resetPassword);
module.exports = router;
