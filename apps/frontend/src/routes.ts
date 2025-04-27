import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "./pages/ProtectedRoutes.tsx", [index("./pages/Home.tsx")]),
  route("/login", "./pages/Login.tsx"),
  route("/logout", "./pages/Logout.tsx"),
] satisfies RouteConfig;
