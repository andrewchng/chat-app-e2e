import { Server, Socket } from "socket.io";
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
  await userState.activateUser(data.username, socket.id);
  socket.emit(socketEvent.JOIN, data);
};

const handleMessage = async (
  io: Server,
  socket: Socket,
  message: incomingMessage
) => {
  const user = await userState.findUserById(socket.id);
  const username = user?.name;
  const outgoing = {
    username,
    ...message,
  };
  io.emit(socketEvent.MESSAGE, outgoing);
};
