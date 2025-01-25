
let socketUrl = "ws://localhost:8000";
const socket = io(socketUrl);

socket.on("message", (data) => {
    console.log(data);
});

