import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("area/:area", "routes/area.tsx"),
  route("map/", "routes/map.tsx"),
] satisfies RouteConfig;
