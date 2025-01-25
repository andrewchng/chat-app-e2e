import { Server, Socket } from "socket.io";
import http from "http";
import { UserState } from "./userState";

enum socketEvent {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  MESSAGE = "message",
  JOIN = "join",
}

const userState = new UserState();

interface incomingMessage {
  message: string;
}

export function initializeSocketServer(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

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

const handleJoin = (socket: Socket, data: { username: string }) => {
  userState.activateUser(data.username, socket.id);
  socket.emit(socketEvent.JOIN, data);
};

const handleMessage = (
  io: Server,
  socket: Socket,
  message: incomingMessage
) => {
  const user = userState.findUserById(socket.id);
  const username = user?.name;
  const outgoing = {
    username,
    ...message,
  };
  io.emit(socketEvent.MESSAGE, outgoing);
};
