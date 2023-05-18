const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);
const port = 4000;
const hostname = "localhost";

const io = new Server(server, {
  cors: {
    origin: `http://${hostname}:3000`,
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  // listen user join to room
  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);

    let createdTime = Date.now();
    // send message to room if there is someone join to chat room
    socket.to(room).emit("receive_message", {
      message: `${username} telah bergabung ke room chat ${room}`,
      username: CHAT_BOT,
      createdTime,
    });

    socket.emit("receive_message", {
      message: `Selamat Datang ${username}`,
      username: CHAT_BOT,
      createdTime,
    });

    chatRoom = room;
    // store data user in temporary database
    allUsers.push({ id: socket.id, username, room });
    const chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });

  // Listen for when the client connects via socket.io-client
  io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);
  });
});

// ROUTING
app.get("/", (req, res) => {
  res.send("Hello Dunia");
});

// LISTENING SERVER
server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
