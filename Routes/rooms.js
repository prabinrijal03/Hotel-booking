const express = require("express");
const Room = require("../model/Room.js");
const Hotel = require("../model/Hotel.js");
const {
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRoom,
} = require("../controllers/roomController.js");
const { verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = function (req, file, cb) {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "video/mp4" ||
    file.mimetype == "video/mkv" ||
    file.mimetype == "video/mov" ||
    file.mimetype == "video/quicktime"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
cloudinary.config({
  cloud_name: "dlxftizkl",
  api_key: "698938595926955",
  api_secret: "PSphDhSa0JAZ5RtMQrRKRQCPYHE",
});
//create
router.post("/:hotelid", upload.array("photos", 5), async function (req, res) {
  try {
    const { name, description, price, maxPeople, roomNumbers } = req.body;
    const urls = [];
    const files = req.files;

    const id = req.params.hotelid;

    const rooms = await Room.find({ hotelid: id });
    const hotels = await Hotel.findById(req.params.hotelid);
    if (rooms.length == 0) {
      if (price > hotels.cheapestPrice) {
        return res.status(200).json({
          success: true,
          message: "All rooms price is greater than hotel's cheapest price",
        });
      }
    }
    if (price < hotels.cheapestPrice) {
      await Hotel.updateOne({ cheapestPrice: price });
    }
    for (const file of files) {
      const { path } = file;
      const result = await cloudinary.uploader.upload(path);
      urls.push(result.secure_url);
    }

    const room = new Room({
      name: name,
      hotelid: req.params.hotelid,
      description,
      price,
      maxPeople,
      roomNumbers,
      photos: urls,
    });

    const newroom = await room.save();

    if (!hotels) {
      return res
        .status(200)
        .json({ success: true, message: "Hotel not found" });
    }

    hotels.allrooms.push({
      roomid: newroom._id,
      name: name,
      description: description,
      price: price,
      maxPeople: maxPeople,
      roomNumbers: roomNumbers,
    });

    await hotels.save();
    return res.status(200).json({ success: true, message: "Rooms uploaded" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", verifyAdmin, updateRoom);

//delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//get
router.get("/:id", getRoom);

//get all
router.get("/", getAllRoom);
module.exports = router;
