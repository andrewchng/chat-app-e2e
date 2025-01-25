
let socketUrl = "ws://localhost:3001";
const socket = io(socketUrl);

socket.on("message", (data) => {
    console.log(data);
});

