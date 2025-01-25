import app from "./app";
import http from "http"
import { initializeSocketServer } from "./socket";

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


initializeSocketServer(server)

export default server;

