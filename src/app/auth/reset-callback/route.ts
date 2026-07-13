import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Successfully authenticated via the recovery link.
      // Redirect strictly to the reset-password page.
      return NextResponse.redirect(`${origin}/reset-password`)
    } else {
      console.error('exchangeCodeForSession error in reset-callback:', error)
    }
  }

  const errDesc = searchParams.get('error_description')
  if (errDesc) {
    return NextResponse.redirect(`${origin}/login?message=${encodeURIComponent(errDesc)}`)
  }

  // Fallback error
  return NextResponse.redirect(`${origin}/login?message=Invalid or expired password reset link`)
}
