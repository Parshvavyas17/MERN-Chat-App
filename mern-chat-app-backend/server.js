require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const rooms = ["General", "Technology", "Finance", "Crypto"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const server = require("http").createServer(app);
const socketio = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
