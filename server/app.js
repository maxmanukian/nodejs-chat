require("dotenv").config();
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const { formatMessage } = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave,
} = require("./utils/users");
const botName = "Chat Bot";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "../public")));

//When client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    //welcome current user
    socket.emit(
      "message",
      formatMessage(botName, ` Welcome to chat ${user.username}`)
    );

    //broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined at chat`)
      );

        io.to(user.room).emit('roomUsers', ({
          room: user.room,
          users: getRoomUsers(user.room)
        }))
  });

  //   lisening chatmessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
  //runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );
      io.to(user.room).emit('roomUsers', ({
        room: user.room,
        users: getRoomUsers(user.room)
      }))
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`App Sarted [+] http://localhost:${process.env.PORT}`);
});
