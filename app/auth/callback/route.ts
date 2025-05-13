import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies });
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Error exchanging code for session:', error);
        // Redirect to auth page with error parameter
        return NextResponse.redirect(
          new URL(`/auth?error=${encodeURIComponent('Failed to authenticate. Please try again.')}`, requestUrl.origin)
        );
      }
    } catch (error) {
      console.error('Error in auth callback:', error);
      return NextResponse.redirect(
        new URL(`/auth?error=${encodeURIComponent('An unexpected error occurred. Please try again.')}`, requestUrl.origin)
      );
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
} 