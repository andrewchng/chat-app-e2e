import { useForm } from "@tanstack/react-form";
import { socketEvent } from "../types/socket-events";
import { useNavigate } from "@tanstack/react-router";
import { socket } from "@/socket";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button";
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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <form.Field
                      name="name"
                      children={(field) => (
                        <Input
                          required
                          name={field.name}
                          value={field.state.value}
                          placeholder="m@example.com"
                          onChange={(e) => {
                            field.handleChange(e.target.value);
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a
                    href="#"
                    onClick={() => {
                      navigate({ to: "/register" });
                    }}
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
