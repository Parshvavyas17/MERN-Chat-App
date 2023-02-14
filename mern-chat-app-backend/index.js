const server = require("./server");

const rooms = ["General", "Technology", "Finance", "Crypto"];
const port = process.env.PORT || 5000;

const socketio = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
