require("dotenv").config();
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "../public")));
console.log(__dirname, "../../public");

//When client connects
io.on("connection", (socket) => {
  //welcome current user
  socket.emit("message", "Welcome to chat");

  //broadcast when a user connects
  socket.broadcast.emit("message", "A user has joined at chat");

  //runs when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "User has left the chat");
  });

//   lisening chatmessage
  socket.on('chatMessage', (msg) => {
    io.emit('message',msg)
  })
});

server.listen(process.env.PORT, () => {
  console.log(`App Sarted on Port [+]${process.env.PORT}`);
});
