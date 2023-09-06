import User from "../model/User.js"
import bcrypt from "bcryptjs";
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
}

export const login = async (req,res)=>{
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
}