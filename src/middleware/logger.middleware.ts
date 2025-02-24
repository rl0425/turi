import type { Middleware } from "./types";

export const loggerMiddleware: Middleware = async ({ req, pathname }) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);
  return { continue: true };
};
