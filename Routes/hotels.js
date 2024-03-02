const express = require("express");
const {
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  updateHotel,
} = require("../controllers/hotelController.js");
const { verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();

//create
router.post("/", verifyAdmin, createHotel);

//update
router.put("/:id", verifyAdmin, updateHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);

//get
router.get("/:id", getHotel);

//get all
router.get("/", getAllHotel);

module.exports = router;
