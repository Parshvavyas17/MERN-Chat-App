require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routers/user.route");
const roomRouter = require("./routers/room.route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/room", roomRouter);

module.exports = app;
