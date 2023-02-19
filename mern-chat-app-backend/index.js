const app = require("./server");
const http = require("http");
const User = require("./models/user.model");
const Message = require("./models/message.model");
const {
  getLastMessagesFromRoom,
  sortRoomMessagesByDate,
} = require("./utils/index");

const server = http.createServer(app);

const socketio = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

socketio.on("connection", (socket) => {
  console.log("New Connection.");

  socket.on("new-user", async () => {
    const members = await User.find();
    socketio.emit("new-user", members);
  });

  socket.on("join-room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    const roomMessages = await getLastMessagesFromRoom(newRoom);
    const sortedRoomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", sortedRoomMessages);
  });

  socket.on("message-room", async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    });
    const roomMessages = await getLastMessagesFromRoom(room);
    const sortedRoomMessages = sortRoomMessagesByDate(roomMessages);
    socketio.to(room).emit("room-messages", sortedRoomMessages);
    socket.broadcast.emit("notifications", room);
  });

  app.delete("/logout", async (req, res) => {
    try {
      const { _id, newMessages } = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit("new-user", members);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(400).send();
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
