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

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);
});

socket.on("join_room", (data) => {
  const { username, room } = data;
  socket.join(room);
});

// ROUTING
app.get("/", (req, res) => {
  res.send("Hello Dunia");
});

// LISTENING SERVER
server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
