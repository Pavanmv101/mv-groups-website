'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const fullName = formData.get('full_name') as string

  if (!fullName || fullName.trim().length === 0) {
    return { error: 'Name cannot be empty.' }
  }

  const { error } = await supabase.auth.updateUser({
    data: { full_name: fullName.trim() }
  })

  if (error) {
    console.error('Update profile error:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard', 'layout')
  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string

  if (!password || password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' }
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    return { error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.' }
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    console.error('Update password error:', error)
    return { error: error.message }
  }

  return { success: true }
}
