const express = require("express");
const Booking = require("../model/booking.js");
const Hotel = require("../model/Hotel.js");
const Room = require("../model/Room.js");

const router = express.Router();

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();

    const responseArray = [...bookings];

    return res.status(200).json(responseArray);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ success: false, message: error });
  }
});

router.post("/getbookingbyuserid", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid });
    const responseArray = [...bookings];

    return res.status(200).json(responseArray);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/bookroom/:id", async (req, res) => {
  const { roomid, hotelid, fromdate, todate, totalamount, totaldays } =
    req.body;

  try {
    const hotel = await Hotel.findById(hotelid);
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }

    const room = await Room.findById(roomid);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    // Check if requested room numbers exceed available rooms
    if (hotel.currentbookings.length - 1 > room.roomNumbers) {
      return res.status(200).json({
        success: true,
        message: "Requested room numbers exceed available rooms",
      });
    }

    /*     const availableRooms = room.roomNumbers.filter(
      (roomNumber) =>
        !hotel.currentbookings.some(
          (booking) => booking.roomNumber === roomNumber
        )
    ); */

    /*    if (availableRooms.length < roomNumbers) {
      return res.status(400).json({
        success: false,
        message: "Requested room numbers exceed available rooms",
      });
    } */

    const booking = new Booking({
      hotel: hotel.name,
      hotelid,
      roomid,
      userid: req.params.id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      roomNumber: room.roomNumbers,
      status: "booked",
      photos: hotel.photos,
    });

    await booking.save();

    hotel.currentbookings.push({
      bookingid: booking._id,
      fromdate,
      todate,
      userid: req.params.id,
      roomNumber: room.roomNumbers,
      status: booking.status,
    });

    await hotel.save();

    return res.status(200).json({ success: true, message: "Hotel booked" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong" });
  }
});

router.get("/getadminhotel/:userid", async (req, res) => {
  const hotel = await Hotel.find({ user_id: req.params.userid });

  console.log(hotel);
  return res
    .status(200)
    .json({ success: true, message: "get data success", data: hotel });
});

router.get("/getmybookedhotel/:hotelid", async (req, res) => {
  const hotel = await Booking.find({ hotelid: req.params.hotelid }).find({
    status: "booked",
  });

  console.log(hotel);
  return res
    .status(400)
    .json({ success: true, message: "get data success", data: hotel });
});

router.get("/gethotelroom/:hotelid", async (req, res) => {
  const hotel = await Room.find({ hotelid: req.params.hotelid });
  return res
    .status(200)
    .json({ success: true, message: "get data success", data: hotel });
});

router.get("/getmysuccessbooked/:hotelid", async (req, res) => {
  const hotel = await Booking.find({ hotelid: req.params.hotelid }).find({
    status: "success",
  });

  console.log(hotel);
  return res
    .status(400)
    .json({ success: true, message: "get data success", data: hotel });
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, hotelid } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingid });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "cancelled";
    await booking.save();

    const hotel = await Hotel.findOne({ _id: hotelid });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    hotel.currentbookings = hotel.currentbookings.filter(
      (x) => x.bookingid.toString() !== bookingid
    );
    await hotel.save();
    return res
      .status(200)
      .json({ message: "Booking cancelled", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
