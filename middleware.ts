import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Middleware auth error:', error);
      // If there's an error getting the session, redirect to auth page
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth', req.url));
      }
      return res;
    }

    // Check if the request is for a protected route
    const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard');
    const isAuthRoute = req.nextUrl.pathname.startsWith('/auth');
    const isCallbackRoute = req.nextUrl.pathname.startsWith('/auth/callback');

    // Allow callback route to proceed without redirection
    if (isCallbackRoute) {
      return res;
    }

    // Redirect to auth page if trying to access a protected route without a session
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL('/auth', req.url);
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Redirect to dashboard if already logged in and trying to access auth pages
    if (isAuthRoute && session) {
      const redirectUrl = new URL('/dashboard', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of any error, allow the request to proceed
    return res;
  }
}

// Define which routes this middleware should run for
export const config = {
  matcher: [
    // Protected routes
    '/dashboard/:path*',
    // Auth routes
    '/auth/:path*',
    // Public routes that should still check for session
    '/',
  ],
};