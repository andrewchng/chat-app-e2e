import { Server, Socket } from "socket.io";
import  UserService  from "./services/user.service";
// src/socke
enum socketEvent {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  MESSAGE = "message",
  JOIN = "join",
}

interface incomingMessage {
  message: string;
}

export function initializeSocketServer(io: Server) {
  io.on(socketEvent.CONNECT, (socket) => {
    console.log(`New client connected: ${socket.id})`);
    socket.on(socketEvent.MESSAGE, (message: incomingMessage) => {
      handleMessage(io, socket, message);
    });

    socket.on(socketEvent.JOIN, (data: { username: string }) => {
      handleJoin(socket, data);
    });
  });
}

const handleJoin =  async (socket: Socket, data: { username: string }) => {
  console.log(`New user joined: ${data.username}`)
  await UserService.activateUser(data.username, socket.id);
  socket.emit(socketEvent.JOIN, data);
};

const handleMessage = async (
  io: Server,
  socket: Socket,
  message: incomingMessage
) => {
  const user = await UserService.findUserById(socket.id);
  const username = user?.name;
  console.log(`Message received: ${message} by ${username}`);
  const outgoing = {
    username,
    ...message,
  };
  io.emit(socketEvent.MESSAGE, outgoing);
  console.log(`Message sent back: ${message} by ${username}`);

};
