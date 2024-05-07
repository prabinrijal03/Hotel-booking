/* const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const hotelModel = require("../model/Hotel.js");

const router = express.Router();

cloudinary.config({
  cloud_name: "dlxftizkl",
  api_key: "698938595926955",
  api_secret: "PSphDhSa0JAZ5RtMQrRKRQCPYHE",
});

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post(
  "/hotels/:hotelId/photos",
  upload.array("photos", 5),
  async (req, res) => {
    try {
      const hotelId = req.params.hotelId;
      const files = req.files;

      const hotel = await hotelModel.findById(hotelId);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const uploadedPhotos = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.buffer, {
          folder: "hotels",
        });
        uploadedPhotos.push(result.secure_url);
      }

      hotel.photos = hotel.photos.concat(uploadedPhotos);

      await hotel.save();

      res
        .status(200)
        .json({ message: "Photos uploaded successfully", hotel: hotel });
    } catch (error) {
      console.error("Error uploading photos:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
 */