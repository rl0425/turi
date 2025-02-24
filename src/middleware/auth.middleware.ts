import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { Middleware } from "./types";

// 임시로 any 사용
type Database = any;

const publicPaths = ["/login", "/register", "/forgot-password"];

export const authMiddleware: Middleware = async ({ req, pathname }) => {
  const supabase = createMiddlewareClient<Database>({
    req,
    res: NextResponse.next(),
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (publicPaths.includes(pathname)) {
    return session ? { redirect: "/" } : { continue: true };
  }

  return session ? { continue: true } : { redirect: "/login" };
};
