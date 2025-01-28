import { MouseEventHandler, useEffect, useState } from "react";
import { socket } from "../socket";
import { socketEvent } from "../types/socket-events";

interface outgoingMessage {
  message: string;
}

interface chatBubble {
  username: string;
  message: string;
  timestamp?: Date;
}

export default function ChatPage() {
  const [chat, setChat] = useState<chatBubble[]>([]);

  useEffect(() => {
    socket.on(socketEvent.MESSAGE, (message) => {
      setChat((chat) => [...chat, message]);
    });
  }, []);

  return (
    <div className="p-2">
      <ul>
        {chat.map((bubble, index) => (
          <li key={index}>
            {bubble.username}: {bubble.message}
          </li>
        ))}
      </ul>
      <ChatInput></ChatInput>
    </div>
  );
}

function ChatInput() {
  const [messageInput, setMessageInput] = useState("");
  function onSend() {
    const message: outgoingMessage = {
      message: messageInput,
    };
    socket.emit(socketEvent.MESSAGE, message);
    console.log("send message!", message);
  }

  return (
    <div className="fixed bottom-0 shadow-l left-0 right-0 text-black m-4 bg-white h-16 rounded-4xl">
      <div className="flex h-full w-full px-6 py-2">
        <input
          onChange={(e) => setMessageInput(e.target.value)}
          value={messageInput}
          className="h-full flex-grow focus:outline-none focus:border-black"
          placeholder="Send a Message"
          type="text"
        />
        <button
          onClick={onSend}
          className="ml-4 bg-blue-400 rounded px-6 py-2 hover:bg-blue-500 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
