const express = require("express");
const { getRooms } = require("../controllers/room.controller");

const router = express.Router();

router.get("/", getRooms);

module.exports = router;
