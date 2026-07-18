'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limit'

export async function submitApplication(prevState: unknown, formData: FormData) {
  try {
    const supabase = await createClient()

    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1'
    const rateLimitResult = await checkRateLimit(`careers_${ip}`)

    if (!rateLimitResult.success) {
      return { success: false, error: 'Too many requests. Please try again later.' }
    }

    // 1. Extract basic form fields
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const city = formData.get('city') as string
    const interest = formData.get('interest') as string
    const availability = formData.get('availability') as string
    const resumeFile = formData.get('resume') as File | null

    if (!name || !email || !phone || !city || !interest || !availability) {
      return { success: false, error: 'Please fill out all required fields.' }
    }

    // Basic phone validation
    const phoneDigits = phone.replace(/\D/g, '')
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return { success: false, error: 'Please enter a valid phone number (10-15 digits).' }
    }

    let resume_url = null

    // 2. Upload resume if provided
    if (resumeFile && resumeFile.size > 0) {
      if (resumeFile.size > 5 * 1024 * 1024) {
        return { success: false, error: 'Resume must be less than 5MB.' }
      }
      const allowedMimeTypes: Record<string, string> = {
        'application/pdf': 'pdf',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
      }
      if (!allowedMimeTypes[resumeFile.type]) {
        return { success: false, error: 'Resume must be a PDF or Word document.' }
      }

      const fileExt = allowedMimeTypes[resumeFile.type]
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      const { error: uploadError } = await supabase
        .storage
        .from('resumes')
        .upload(fileName, resumeFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Resume upload error:', uploadError)
        return { success: false, error: 'Failed to upload resume. Please try again without a resume or try later.' }
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(fileName)
      resume_url = publicUrl
    }

    // 3. Insert into applicants table
    const { error: insertError } = await supabase.from('applicants').insert([
      {
        name,
        email,
        phone,
        city,
        area_of_interest: interest,
        availability,
        resume_url
      }
    ])

    if (insertError) {
      console.error('Application insert error:', insertError)
      return { success: false, error: `Submission failed: ${insertError.message} (code: ${insertError.code})` }
    }

    revalidatePath('/admin') // refresh admin cache
    
    return { success: true, error: null }

  } catch (error) {
    console.error('Error submitting application:', error)
    return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred.' }
  }
}
