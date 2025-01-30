import { useEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import { socketEvent } from "../types/socket-events";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";
import { ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/Input";

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
    console.log(localStorage.getItem("username"));
    if (!localStorage.getItem("username")) {
      navigate({
        to: "/",
      });
      return;
    }

    function onMessage(message: chatBubble) {
      console.log("incoming message", message);
      setChat((chat) => [...chat, message]);
    }

    socket.on(socketEvent.MESSAGE, onMessage);
    return () => {
      socket.off(socketEvent.MESSAGE, onMessage);
    };
  }, []);

  return (
    <div className="p-2">
      {chat.map((bubble, index) => (
        <ChatBubble key={index} {...bubble}></ChatBubble>
      ))}
      <ChatMessageBar></ChatMessageBar>
    </div>
  );
}

function ChatBubble({ username, message, timestamp }: chatBubble) {
  return (
    <>
      <div className="flex w-max max-w-[75%] bg-secondary px-3 py-2 ml-auto rounded-lg m-2">
        {username}: {message}
        {timestamp && <span> ({timestamp.toLocaleTimeString()})</span>}
      </div>
    </>
  );
}

function ChatMessageBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function onSend() {
    const message: outgoingMessage = {
      message: messageInput,
    };
    socket.emit(socketEvent.MESSAGE, message);
    console.log("send message!", message);
    setMessageInput("");
  }

  return (
    <div className="fixed bottom-5 left-0 right-0 h-13 flex justify-center">
      <div className="md:max-w-[75%] sm:max-w-[90%] rounded-lg w-full">
        <form
          className="flex "
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
        >
          <Input
            ref={inputRef}
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
            className="h-full flex-grow"
            placeholder="Send a Message"
            type="text"
          ></Input>
          <Button
            variant={"outline"}
            type="submit"
            className="ml-1 rounded py-2 px-3"
          >
            <ChevronUp />
          </Button>
        </form>
      </div>
    </div>
  );
}
