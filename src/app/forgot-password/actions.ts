'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string
  
  if (!email) {
    return { error: 'Email is required' }
  }

  const supabase = await createClient()
  
  // Get the host/origin dynamically to support local and prod environments
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const origin = `${protocol}://${host}`

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/reset-callback`,
  })

  // We return success regardless of whether the email exists
  // to prevent email enumeration. Supabase handles this gracefully.
  if (error && error.message !== 'Signups not allowed for this instance') {
    // We only log the error but don't expose it to the client, unless it's a rate limit
    console.error('Reset password error:', error)
  }

  return { success: true }
}
