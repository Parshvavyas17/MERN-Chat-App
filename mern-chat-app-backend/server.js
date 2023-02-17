require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const userRouter = require("./routers/user.route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);

const server = http.createServer(app);

module.exports = server;
