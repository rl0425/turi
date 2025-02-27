import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { composeMiddleware } from "./middleware/compose";
import { authMiddleware } from "./middleware/auth.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

const middlewareChain = composeMiddleware([
  errorMiddleware,
  loggerMiddleware,
  authMiddleware,
]);

export async function middleware(req: NextRequest) {
  const result = await middlewareChain({
    req,
    pathname: req.nextUrl.pathname,
  });

  if (result.redirect) {
    return NextResponse.redirect(new URL(result.redirect, req.url));
  }

  if (result.rewrite) {
    return NextResponse.rewrite(new URL(result.rewrite, req.url));
  }

  return NextResponse.next();
}

// 특정 경로에만 미들웨어를 적용하고 싶다면 config를 설정하세요
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
