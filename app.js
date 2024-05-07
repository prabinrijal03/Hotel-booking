const express = require("express");
const app = express();
const authRoute = require("./Routes/auth.js");
const usersRoute = require("./Routes/users.js");
const hotelsRoute = require("./Routes/hotels.js");
const roomsRoute = require("./Routes/rooms.js");
const cookieParser = require("cookie-parser");
const hotelBooking = require("./Routes/bookingRoute.js");
// const storageCloud = require("./cloudinary/storageCloud.js");

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/booking", hotelBooking);
// app.use("/api", storageCloud);
const TIMEZONE = (process.env.TZ = "Asia/Kathmandu");

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
