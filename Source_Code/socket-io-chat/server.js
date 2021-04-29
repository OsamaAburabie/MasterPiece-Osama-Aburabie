const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const cors = require("cors");

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  socket.on("get-task", (taskId) => {
    socket.join(taskId);
    socket.on("send-message", (message) => {
      socket.broadcast.to(taskId).emit("receive-message", message);
    });
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));
