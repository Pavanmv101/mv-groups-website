'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitApplication(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()

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
      
      const { data: uploadData, error: uploadError } = await supabase
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
        interest,
        availability,
        resume_url
      }
    ])

    if (insertError) {
      console.error('Application insert error:', insertError)
      return { success: false, error: 'An error occurred while submitting your application.' }
    }

    revalidatePath('/admin') // refresh admin cache
    
    return { success: true, error: null }

  } catch (err: any) {
    console.error('Submit Application Exception:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
