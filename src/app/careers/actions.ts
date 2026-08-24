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
    
    // New fields
    const gender = formData.get('gender') as string
    const experience = formData.get('experience') as string
    const languages = formData.get('languages') as string
    const instagram = formData.get('instagram') as string
    
    const resumeFile = formData.get('resume') as File | null
    const photoFile = formData.get('photo') as File | null

    if (!name || !email || !phone || !city || !interest || !availability || !gender || !experience || !languages) {
      return { success: false, error: 'Please fill out all required fields.' }
    }

    // Basic phone validation
    const phoneDigits = phone.replace(/\D/g, '')
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return { success: false, error: 'Please enter a valid phone number (10-15 digits).' }
    }

    let resume_url = null
    let photo_url = null

    // Helper function to upload files
    const uploadFile = async (file: File, allowedTypes: Record<string, string>, maxMb: number) => {
      if (file.size > maxMb * 1024 * 1024) {
        throw new Error(`File must be less than ${maxMb}MB.`)
      }
      if (!allowedTypes[file.type]) {
        throw new Error('Invalid file format.')
      }
      const fileExt = allowedTypes[file.type]
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      const { error } = await supabase.storage.from('resumes').upload(fileName, file, { cacheControl: '3600', upsert: false })
      if (error) throw new Error('Failed to upload file.')
      
      const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(fileName)
      return publicUrl
    }

    // 2. Upload resume if provided
    try {
      if (resumeFile && resumeFile.size > 0) {
        resume_url = await uploadFile(resumeFile, {
          'application/pdf': 'pdf',
          'application/msword': 'doc',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
        }, 5)
      }
      if (photoFile && photoFile.size > 0) {
        photo_url = await uploadFile(photoFile, {
          'image/jpeg': 'jpg',
          'image/png': 'png',
          'image/webp': 'webp'
        }, 5)
      }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'File upload failed.' }
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
        resume_url,
        gender,
        experience,
        languages,
        instagram,
        photo_url
      }
    ])

    if (insertError) {
      console.error('Application insert error:', insertError)
      return { success: false, error: `Submission failed: ${insertError.message} (code: ${insertError.code})` }
    }

    // 4. Send Email Notification using Nodemailer
    try {
      const nodemailer = require('nodemailer')
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })

      const mailOptions = {
        from: `"MV Groups Website" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `New Career Application: ${name}`,
        html: `
          <h2>New Job Application Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Interest:</strong> ${interest}</p>
          <p><strong>Availability:</strong> ${availability}</p>
          <hr />
          <p><strong>Gender:</strong> ${gender}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Languages:</strong> ${languages}</p>
          <p><strong>Instagram:</strong> ${instagram || 'None provided'}</p>
          ${resume_url ? `<p><a href="${resume_url}">📄 View Resume</a></p>` : '<p>No resume uploaded.</p>'}
          ${photo_url ? `<p><a href="${photo_url}">📸 View Photo</a></p>` : '<p>No photo uploaded.</p>'}
        `,
      }

      await transporter.sendMail(mailOptions)
    } catch (emailErr) {
      console.error('Failed to send email notification:', emailErr)
      // We don't fail the submission if email fails, just log it.
    }

    revalidatePath('/admin') // refresh admin cache
    
    return { success: true, error: null }

  } catch (error) {
    console.error('Error submitting application:', error)
    return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred.' }
  }
}
