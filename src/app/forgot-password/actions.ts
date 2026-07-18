'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string
  
  if (!email) {
    return { error: 'Email is required' }
  }

  const supabase = await createClient()
  
  // Hardcode the production URL to guarantee it matches the Supabase Whitelist,
  // since Vercel dynamic host headers can sometimes cause redirect mismatch errors.
  const origin = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://www.mvgroups.online'

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  })

  // We return success regardless of whether the email exists
  // to prevent email enumeration. Supabase handles this gracefully.
  if (error && error.message !== 'Signups not allowed for this instance') {
    // We only log the error but don't expose it to the client, unless it's a rate limit
    console.error('Reset password error:', error)
  }

  return { success: true }
}
