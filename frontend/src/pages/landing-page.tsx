import { useForm } from "@tanstack/react-form";
import { socket } from "../socket";
import { socketEvent } from "../types/socket-events";

function LandingPage() {
  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      onJoin(value)
    },
  });

  function onJoin(data: { name: string; }){ 
    socket.emit(socketEvent.JOIN, 
      {username: data.name})
  }

  return (
    <div className="p-2">
      <form
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
              <input
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LandingPage;
