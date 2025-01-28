import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { socketEvent } from "../types/socket-events";
import { useNavigate } from "@tanstack/react-router";

interface outgoingMessage {
  message: string;
}

interface chatBubble {
  username: string;
  message: string;
  timestamp?: Date;
}

export default function ChatPage() {
  const navigate = useNavigate();
  const [chat, setChat] = useState<chatBubble[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate({
        to: "/",
      });
    }

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
      <ChatMessageBar></ChatMessageBar>
    </div>
  );
}

function ChatMessageBar() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [messageInput, setMessageInput] = useState("");

  useEffect(()=>{
    if(inputRef.current){
      inputRef.current.focus();
    }
  },[])

  function onSend() {
    const message: outgoingMessage = {
      message: messageInput,
    };
    socket.emit(socketEvent.MESSAGE, message);
    console.log("send message!", message);
    setMessageInput("");
  }

  return (
    <div className="fixed bottom-0 shadow-l left-0 right-0 text-grey-100 m-4 bg-gray-800 h-13 rounded-4xl">
      <form
        className="flex h-full w-full px-6 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <input
          ref={inputRef}
          onChange={(e) => setMessageInput(e.target.value)}
          value={messageInput}
          className="h-full flex-grow focus:outline-none focus:border-black"
          placeholder="Send a Message"
          type="text"
        />
        <button
          type="submit"
          className="ml-4 rounded py-2 px-3  hover:bg-gray-700 transition-colors"
        >
          ^
        </button>
      </form>
    </div>
  );
}
