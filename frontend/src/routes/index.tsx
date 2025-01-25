import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: HomeComponent,
});
import { socket } from "../socket";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface incomingMessage {
  message: string;
  username: string;
}
interface outgoingMessage {
  message: string;
}

enum socketEvent {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  MESSAGE = "message",
  JOIN = "join",
}

function HomeComponent() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<incomingMessage[]>([]);

  const onSend = () => {
    const outgoingMessage: outgoingMessage = { message };
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
      setChat((chat) => [...chat, value]);
    }

    function onJoin(message: incomingMessage) {
      setIsLoggedIn(true);
    }

    socket.on(socketEvent.CONNECT, onConnect);
    socket.on(socketEvent.DISCONNECT, onDisconnect);
    socket.on(socketEvent.MESSAGE, onMessage);
    socket.on(socketEvent.JOIN, onJoin);

    return () => {
      socket.off(socketEvent.CONNECT, onConnect);
      socket.off(socketEvent.DISCONNECT, onDisconnect);
      socket.off(socketEvent.MESSAGE, onMessage);
    };
  }, []);

  return (
    <div className="p-2">
      {/* <p>State: {"" + isConnected}</p>{" "} */}
      <Login></Login>
      {isLoggedIn && (
        <div>
          <h1>Chat area</h1>
          <div>
            <ul>
              {chat.map((chat, index) => (
                <li key={index}>
                  {chat.username}: {chat.message}
                </li>
              ))}
            </ul>
          </div>
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
      )}
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState<string>("");

  const onJoin = () => {
    socket.emit(socketEvent.JOIN, {
      username,
    });

    console.log("JOIN");
  };

  return (
    <div>
      <input
        value={username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <button onClick={onJoin}>Login</button>
    </div>
  );
}
