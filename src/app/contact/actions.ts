'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limit'

export async function submitInquiry(prevState: unknown, formData: FormData) {
  try {
    const supabase = await createClient()

    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1'
    const rateLimitResult = await checkRateLimit(`contact_${ip}`)

    if (!rateLimitResult.success) {
      return { success: false, error: 'Too many requests. Please try again later.' }
    }

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!name || !email || !subject || !message) {
      return { success: false, error: 'Please fill out all required fields.' }
    }

    const { error: insertError } = await supabase.from('inquiries').insert([
      {
        name,
        email,
        phone,
        subject,
        message,
      }
    ])

    if (insertError) {
      console.error('Inquiry insert error:', insertError)
      return { success: false, error: 'An error occurred while submitting your message.' }
    }

    revalidatePath('/admin')
    
    return { success: true, error: null }

  } catch (err) {
    console.error('Submit Inquiry Exception:', err)
    return { success: false, error: err instanceof Error ? err.message : 'An unexpected error occurred.' }
  }
}
