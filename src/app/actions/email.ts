'use server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendApplicantStatusEmail(name: string, email: string, status: string) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Email credentials not configured')
    return { success: false, error: 'Email credentials not configured' }
  }

  // Only send emails for shortlisted or rejected statuses
  if (status !== 'shortlisted' && status !== 'rejected') {
    return { success: true } 
  }

  let subject = ''
  let htmlContent = ''

  if (status === 'shortlisted') {
    subject = 'Update on your application with MV Groups - Shortlisted!'
    htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #4f46e5;">Congratulations, ${name}!</h2>
        <p>Thank you for applying to MV Groups. We have reviewed your application and are pleased to inform you that you have been <strong>shortlisted</strong> for the next round.</p>
        <p>Our team will be in touch with you shortly with further details regarding the next steps.</p>
        <p>Best regards,<br>The MV Groups Team</p>
      </div>
    `
  } else if (status === 'rejected') {
    subject = 'Update on your application with MV Groups'
    htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2>Hi ${name},</h2>
        <p>Thank you for taking the time to apply to MV Groups. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.</p>
        <p>We will keep your resume on file for future opportunities that may match your skills.</p>
        <p>We wish you the best of luck in your job search.</p>
        <p>Best regards,<br>The MV Groups Team</p>
      </div>
    `
  }

  try {
    await transporter.sendMail({
      from: `"MV Groups" <${process.env.GMAIL_USER}>`,
      to: email,
      subject,
      html: htmlContent,
    })
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
