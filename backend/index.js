import express from "express";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;
const app = express();

const socketEvent = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  MESSAGE: "message",
  JOIN: "join",
};

const userState = {
  users: [],
  setUsers: function (users) {
    this.users = users;
  },
};

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${expressServer.address().port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
});

io.on(socketEvent.CONNECT, (socket) => {
  console.log(`New client connected: ${socket.id})`);

  socket.on(socketEvent.MESSAGE, (message) => {
      const username = findUserById(socket.id).name;
      console.log("User", username);
    const outgoing = {
      username,
      ...message,
    };
    io.emit(socketEvent.MESSAGE, outgoing);
  });

  socket.on(socketEvent.JOIN, (data) => {
    activateUser(data.username, socket.id);
    socket.emit(socketEvent.JOIN, data);
  });
});

function activateUser(name, id) {
  const user = {
    name,
    id,
  };
  userState.setUsers([
    ...userState.users.filter((user) => user.id !== id),
    user,
  ]);
  console.log(`Active users: ${userState.users.length}`, userState.users);
  return user;
}

function findUserById(userId) {
  return userState.users.find(({ id }) => id === userId);
}
