'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limit'

export async function submitBooking(formData: FormData) {
  try {
    const supabase = await createClient()

    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1'
    const rateLimitResult = await checkRateLimit(`booking_${ip}`)

    if (!rateLimitResult.success) {
      return { success: false, error: 'Too many requests. Please try again later.' }
    }

    const contact_phone = formData.get('contact_phone') as string
    if (contact_phone) {
      const phoneDigits = contact_phone.replace(/\D/g, '')
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        return { success: false, error: 'Please enter a valid phone number (10-15 digits).' }
      }
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
