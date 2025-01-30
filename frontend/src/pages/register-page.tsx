import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";

export function RegisterPage() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      //call register api

      try {
        console.log("Register", value);
        const response = await fetch(
          "http://localhost:8000/api/users/register",
          {
            method: "GET",
            // body: JSON.stringify(value),
          }
        );
        const data = await response.json();
        console.log("Register response", data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
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
                      name="email"
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
                    </div>
                    <form.Field
                      name="password"
                      children={(field) => (
                        <Input
                          id="password"
                          type="password"
                          required
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => {
                            field.handleChange(e.target.value);
                          }}
                        />
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
