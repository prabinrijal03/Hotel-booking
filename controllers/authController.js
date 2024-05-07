const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/sendEmail.js");
exports.register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    if (!/@gmail\.com$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid Gmail account (example@gmail.com)",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "email already exists" });
    }

    const newUser = new User({
      fullname: fullname,
      email: email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({ success: true, message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
exports.login = async (req, res) => {
  try {
    const loginByEmail = await User.findOne({ email: req.body.email });
    if (!loginByEmail) {
      return res.status(500).json({ success: false, message: "Invalid email" });
    }
    const user = loginByEmail;
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      "secretKey"
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        ...otherDetails,
        success: true,
        token: token,
        isAdmin: user.isAdmin,
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist.length == 0) {
      return res.status(404).json({ message: "Email is not registered" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);

    await sendEmail({
      email: email,
      subject: "Your Otp for Hotel-Room-Booking forgotPassword",
      message: `${otp}`,
    });

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { otp: otp } },
      { new: true }
    );

    res.status(200).json({ message: "OTP sent successfully", data: email });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Please provide email and otp" });
    }

    const user = await User.findOne({ email: email }).select(
      "+otp +isOtpVerified"
    );
    if (!user) {
      return res.status(404).json({ message: "Email is not registered" });
    }

    const otpFromUser = user.otp.toString();
    const otpFromRequest = otp.toString();

    if (otpFromUser !== otpFromRequest) {
      return res.status(400).json({ message: "Invalid otp" });
    } else {
      user.otp = undefined;
      user.isOtpVerified = true;
      await user.save();
      res.status(200).json({ message: "Otp is correct" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Please provide email, newPassword, and confirmPassword",
      });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    const user = await User.findOne({ email: email }).select("+isOtpVerified");
    if (!user) {
      return res.status(404).json({ message: "User email not registered" });
    }

    if (!user.isOtpVerified) {
      return res
        .status(403)
        .json({ message: "You cannot perform this action" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    user.password = hash;
    user.isOtpVerified = true;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
