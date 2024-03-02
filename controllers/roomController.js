const Room = require("../model/Room.js");
const Hotel = require("../model/Hotel.js");

exports.createRoom = async (req, res) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      res.status(500).json(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      res.status(500).json(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getAllRoom = async (req, res) => {
  try {
    console.log("success");
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    console.log("error");

    res.status(500).json(err);
  }
};
