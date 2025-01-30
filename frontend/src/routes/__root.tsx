import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

// components
import { ModeToggle } from "@/components/shared/ModeToggle";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        {/* <Link
          to="/chat"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Chat
        </Link>{" "} */}
        <ModeToggle />
      </div>

      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
