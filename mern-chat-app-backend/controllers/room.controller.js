const rooms = ["General", "Technology", "Finance", "Crypto"];

const getRooms = (req, res) => {
  res.json(rooms);
};

module.exports = { getRooms };
