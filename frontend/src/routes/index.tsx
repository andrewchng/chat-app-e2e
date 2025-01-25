import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: HomeComponent,
});
import { socket } from "../socket";
import { useEffect, useState } from "react";

interface incomingMessage {
  message: string;
}
interface outgoingMessage {
  message: string;
}

enum socketEvent {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  MESSAGE = "message"
}

function HomeComponent() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<string[]>([]);


  const onSend = () => {
    const outgoingMessage : outgoingMessage = { message };
    socket.emit(socketEvent.MESSAGE, outgoingMessage);
    setMessage("");
  };

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(value: incomingMessage) {
      setChat((chat) => [...chat, value.message]);
    }

    socket.on(socketEvent.CONNECT, onConnect);
    socket.on(socketEvent.DISCONNECT, onDisconnect);
    socket.on(socketEvent.MESSAGE, onMessage);

    return () => {
      socket.off(socketEvent.CONNECT, onConnect);
      socket.off(socketEvent.DISCONNECT, onDisconnect);
      socket.off(socketEvent.MESSAGE, onMessage);
    };
  }, []);

  return (
    <div className="p-2">
      <p>State: {"" + isConnected}</p>{" "}
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
          placeholder="message"
          name=""
          id=""
        />
        <button onClick={onSend}>Send</button>
      </div>
      <div>
        <ul>
          {chat.map((chat, index) => (
            <li key={index}>{chat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
