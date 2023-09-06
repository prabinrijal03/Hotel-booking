import express from "express";
const app = express();
import userModel from "./model/User.js";
import authRoute from "./Routes/auth.js";
import usersRoute from "./Routes/users.js";
import hotelsRoute from "./Routes/hotels.js";
import roomsRoute from "./Routes/rooms.js";

//middlewares
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});