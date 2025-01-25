import express from "express";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("fileName", __filename);
console.log("dirName", __dirname);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, ()=>{
    console.log(`Server is running on port ${expressServer.address().port}`);
});

app.get("/", (req, res)=>{
    res.send("Hello World");
});

const io = new Server(expressServer,{
    cors:{
        origin:"*",
    },
});

io.on("connection", (socket)=>{
    console.log(`New client connected: ${socket.id})`);
});
