const User = require("../model/User.js");

exports.updateUser = async (req,res)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set:req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.deleteUser = async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.getAllUser = async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}