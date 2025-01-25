import express from 'express';
import path from 'path'
import { Server } from "socket.io";

const PORT = process.env.PORT || 8000;
const app = express();

const socketEvent = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  MESSAGE: "message",
  JOIN: "join",
};

type User = {
  name: string;
  id: string;
};

const userState = {
  users: new Array<User>(),
  setUsers: function (users: User[]) {
    this.users = users;
  },
};

interface outgoingMessage {
  message: string;
  username: string;
}
interface incomingMessage {
  message: string;
}
console.log(path.join(__dirname, "public"));

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
});

io.on(socketEvent.CONNECT, (socket) => {
  console.log(`New client connected: ${socket.id})`);

  socket.on(socketEvent.MESSAGE, (message: incomingMessage) => {
    const user: User = findUserById(socket.id) as User;
    const username = user.name;
    console.log("User", username);
    const outgoing = {
      username,
      ...message,
    };
    io.emit(socketEvent.MESSAGE, outgoing);
  });

  socket.on(socketEvent.JOIN, (data: { username: string }) => {
    activateUser(data.username, socket.id);
    socket.emit(socketEvent.JOIN, data);
  });
});

function activateUser(name: string, id: string) {
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

function findUserById(socketId: string) {
  return userState.users.find(({ id }) => id === socketId);
}
