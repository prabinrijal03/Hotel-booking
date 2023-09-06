import User from "../model/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req,res)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
    })
    await newUser.save();
    res.status(200).json("User has been created.")
    }
    catch(err){
        res.status(500).json(err);
    }
};

export const login = async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
           return res.status(500).json("User not found");
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordValid){
            return res.status(500).json("Invalid password");
        }
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, 'secretKey');

        const {password, isAdmin, ...otherDetails}= user._doc;
        res.cookie("access_token", token, {httpOnly:true}).status(200).json({...otherDetails});
    }
    catch(err){
        res.status(500).json(err); 
    }
};