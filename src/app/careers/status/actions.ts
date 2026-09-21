'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limit'

export async function checkApplicationStatus(prevState: unknown, formData: FormData) {
  try {
    const supabase = await createClient()

    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1'
    const rateLimitResult = await checkRateLimit(`status_check_${ip}`)

    if (!rateLimitResult.success) {
      return { success: false, error: 'Too many requests. Please try again later.', data: null }
    }

    const applicationId = formData.get('applicationId') as string
    
    if (!applicationId || applicationId.trim() === '') {
      return { success: false, error: 'Please enter a valid Application ID.', data: null }
    }

    // Attempt to query the applicants table
    const { data, error } = await supabase
      .from('applicants')
      .select('name, area_of_interest, status, created_at')
      .eq('id', applicationId.trim())
      .single()

    if (error || !data) {
      return { success: false, error: 'Application not found. Please check the ID and try again.', data: null }
    }

    return { 
      success: true, 
      error: null,
      data: {
        name: data.name,
        role: data.area_of_interest,
        status: data.status,
        date: data.created_at
      }
    }

  } catch (error) {
    console.error('Error checking status:', error)
    return { success: false, error: 'An unexpected error occurred.', data: null }
  }
}
