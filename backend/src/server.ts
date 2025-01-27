import app from "./app";
import http from "http"
import { initializeSocketServer } from "./socket";
import { connectToMongoDB } from "./connection";
import { Server } from "socket.io";

const PORT = process.env.PORT || 8000;


connectToMongoDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

initializeSocketServer(io)

export {server, io};

