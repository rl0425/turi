import { NextRequest } from 'next/server';

export interface MiddlewareContext {
  req: NextRequest;
  pathname: string;
}

export interface MiddlewareResult {
  continue?: boolean;
  redirect?: string;
  rewrite?: string;
}

export type Middleware = (context: MiddlewareContext) => Promise<MiddlewareResult>;
