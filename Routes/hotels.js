const express = require("express");
const {
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
  search,
} = require("../controllers/hotelController.js");
const Hotel = require("../model/Hotel.js");
const User = require("../model/User.js");
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

router.post(
  "/createhotel/:id",
  upload.array("photos", 5),
  async function (req, res) {
    try {
      const { name, description, address, phoneNumber, cheapestPrice } =
        req.body;
      const urls = [];
      const files = req.files;

      for (const file of files) {
        const { path } = file;
        const result = await cloudinary.uploader.upload(path);
        urls.push(result.secure_url);
      }

      const hotel = new Hotel({
        name: name,
        description: description,
        address: address,
        phoneNumber: phoneNumber,
        cheapestPrice: cheapestPrice,
        photos: urls,
        user_id: req.params.id,
      });

      await hotel.save();

      res
        .status(200)
        .json({ success: true, message: "Hotel created successfully", hotel });
    } catch (error) {
      console.error("Error creating hotel:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

//update
router.put("/:id", verifyAdmin, updateHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);

//get
router.get("/:id", getHotel);

router.post("/search", search);

//get all
router.get("/", getAllHotel);

module.exports = router;
