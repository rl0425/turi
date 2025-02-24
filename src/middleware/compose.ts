import type { Middleware, MiddlewareContext, MiddlewareResult } from "./types";

export const composeMiddleware = (middlewares: Middleware[]) => {
  return async (context: MiddlewareContext): Promise<MiddlewareResult> => {
    for (const middleware of middlewares) {
      const result = await middleware(context);

      if (result.redirect || result.rewrite) {
        return result;
      }

      if (!result.continue) {
        break;
      }
    }

    return { continue: true };
  };
};
