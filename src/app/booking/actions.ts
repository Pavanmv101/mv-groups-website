'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limit'

export async function submitBooking(formData: FormData, turnstileToken: string) {
  try {
    const supabase = await createClient()

    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1'
    const rateLimitResult = await checkRateLimit(`booking_${ip}`)

    if (!rateLimitResult.success) {
      return { success: false, error: 'Too many requests. Please try again later.' }
    }

    // Turnstile Validation
    if (!turnstileToken) {
        return { success: false, error: 'CAPTCHA verification is required.' }
    }
    const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    // Use test secret key if not provided
    const secretKey = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA' 
    
    const res = await fetch(verifyEndpoint, {
        method: 'POST',
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(turnstileToken)}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
    
    const data = await res.json()
    // Skip failure check for test token in dev
    if (!data.success && secretKey !== '1x0000000000000000000000000000000AA') {
        return { success: false, error: 'CAPTCHA verification failed.' }
    }

    const { data: { session } } = await supabase.auth.getSession()
    const userId = session?.user?.id || null

    const budgetRange = formData.get('budget_range') as string
    const rawDescription = formData.get('description') as string

    const description = budgetRange 
        ? `[Budget: ${budgetRange}]\n\n${rawDescription || ''}`.trim()
        : rawDescription

    const { error: sbError } = await supabase.from('bookings').insert([
      {
        client_id: userId,
        contact_name: formData.get('contact_name') as string,
        contact_email: formData.get('contact_email') as string,
        contact_phone: formData.get('contact_phone') as string,
        service_type: formData.get('service_type') as string,
        start_date: formData.get('start_date') as string,
        end_date: formData.get('end_date') as string,
        people_needed: parseInt(formData.get('people_needed') as string, 10),
        description,
      },
    ])

    if (sbError) throw sbError
    
    return { success: true }
  } catch (err) {
    console.error('Submit Booking Error:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Something went wrong.' }
  }
}
