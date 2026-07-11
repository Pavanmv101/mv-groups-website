import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/dashboard'
  
  // Prevent open redirect
  if (!next.startsWith('/') || next.startsWith('//')) {
    next = '/dashboard'
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      console.error('exchangeCodeForSession error:', error)
    }
  }

  // Handle Supabase error params in the URL (e.g. from expired email links)
  const err = searchParams.get('error')
  const errDesc = searchParams.get('error_description')
  
  if (err) {
    console.error('Supabase auth error in callback:', err, errDesc)
    return NextResponse.redirect(`${origin}/login?message=${encodeURIComponent(errDesc || 'Authentication failed')}`)
  }

  // Fallback error
  return NextResponse.redirect(`${origin}/login?message=Authentication failed`)
}
