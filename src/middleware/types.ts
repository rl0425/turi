import { NextRequest } from "next/server";

export type MiddlewareContext = {
  req: NextRequest;
  pathname: string;
};

export type MiddlewareResult = {
  redirect?: string;
  rewrite?: string;
  continue?: boolean;
};

export type Middleware = (
  context: MiddlewareContext
) => Promise<MiddlewareResult>;
