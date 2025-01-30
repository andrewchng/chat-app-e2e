import { useForm } from "@tanstack/react-form";
import { socketEvent } from "../types/socket-events";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";
import { socket } from "@/socket";
import { useEffect } from "react";
import { Input } from "@/components/ui/Input";

function LandingPage() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      onJoin(value);
    },
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  function onJoin(data: { name: string }) {
    socket.emit(socketEvent.JOIN, { username: data.name });
    localStorage.setItem("username", data.name);
    navigate({
      to: "/chat",
    });
  }

  return (
    <div className="p-2 flex h-screen justify-center items-center">
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="name"
            children={(field) => (
              <Input
                name={field.name}
                value={field.state.value}
                placeholder="Enter your name"
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
            )}
          />
        </div>
        <Button variant="outline" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default LandingPage;
