'use server'

import { createClient } from '@/utils/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string
  
  if (!email) {
    return { error: 'Email is required' }
  }

  // Create an admin client to bypass RLS and verify email existence
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
  )

  const { data: user, error: userError } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', email)
    .single()

  if (userError || !user) {
    return { error: 'This email is not registered in our system.' }
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

  if (error) {
    console.error('Reset password error:', error)
    return { error: error.message }
  }

  return { success: true }
}
