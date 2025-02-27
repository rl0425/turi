import { Middleware } from '@/features/shared/types/types';
import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export const authMiddleware: Middleware = async ({ req }) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && !req.nextUrl.pathname.startsWith('/auth')) {
    return { redirect: '/auth/login' };
  }

  return { continue: true };
}; 