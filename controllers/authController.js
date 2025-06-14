const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req,res)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newUser.save();
        res.status(200).json("User has been created");
    } catch (error) {
        res.status(500).json(error);
    }
};
exports.login = async (req,res)=>{
    try {
        const loginByUsername = await User.findOne({ username: req.body.username});
        const loginByEmail = await User.findOne({ email: req.body.email});
        if(!loginByUsername && !loginByEmail){
            return res.status(500).json("Invalid username or email");
        }
        const user = loginByUsername || loginByEmail;
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordValid){
            return res.status(500).json("Invalid password");
        }

        const token = jwt.sign({userId: user._id, isAdmin: user.isAdmin}, 'secretKey');

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {httpOnly:true}).status(200).json({...otherDetails});

    } catch (error) {
        res.status(500).json(error);
    }
};