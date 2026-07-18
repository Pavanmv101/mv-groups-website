'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limit'
import nodemailer from 'nodemailer'

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

    if (phone) {
      // Basic validation: strip all non-digits and check length
      const phoneDigits = phone.replace(/\D/g, '')
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        return { success: false, error: 'Please enter a valid phone number (10-15 digits).' }
      }
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

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER, 
        subject: `New Contact Form Submission: ${subject}`,
        text: `You have received a new inquiry from the MV Groups website.
        
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}`
      }

      await transporter.sendMail(mailOptions)
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Even if email fails, we return success because the inquiry is safely in the database
    }

    revalidatePath('/admin')
    
    return { success: true, error: null }

  } catch (err) {
    console.error('Submit Inquiry Exception:', err)
    return { success: false, error: err instanceof Error ? err.message : 'An unexpected error occurred.' }
  }
}
