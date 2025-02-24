import type { Middleware } from "./types";

export const errorMiddleware: Middleware = async ({}) => {
  try {
    return { continue: true };
  } catch (error) {
    console.error("Middleware Error:", error);
    return { redirect: "/error" };
  }
};
