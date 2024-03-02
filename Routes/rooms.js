const express = require("express");
const {
  createRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoom,
} = require("../controllers/roomController.js");
const { verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();

//create
router.post("/:hotelid", verifyAdmin, createRoom);

//update
router.put("/:id", verifyAdmin, updateRoom);

//delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//get
router.get("/:id", getRoom);

//get all
router.get("/", getAllRoom);
module.exports = router;
