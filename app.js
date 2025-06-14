const express = require("express");
const app = express();
const authRoute = require("./Routes/auth.js");
const usersRoute = require("./Routes/users.js");
const hotelsRoute = require("./Routes/hotels.js");
const roomsRoute = require("./Routes/rooms.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});