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

export async function sendBookingApprovedEmail(name: string, email: string, serviceName: string) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Email credentials not configured')
    return { success: false, error: 'Email credentials not configured' }
  }

  const subject = `Your booking for ${serviceName} is Approved! - MV Groups`
  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #4f46e5;">Great news, ${name}!</h2>
      <p>We are thrilled to inform you that your booking request for <strong>${serviceName}</strong> has been <strong>approved</strong> by our team.</p>
      <p>We are preparing the final details and will reach out to you shortly with the final quotation and next steps.</p>
      <p>If you have any immediate questions, feel free to reply to this email or send us a message through your dashboard.</p>
      <p>We look forward to working with you!</p>
      <br/>
      <p>Best regards,<br><strong>The MV Groups Team</strong></p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"MV Groups" <${process.env.GMAIL_USER}>`,
      to: email,
      subject,
      html: htmlContent,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send booking approval email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

type BookingDataPayload = {
  client_id?: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  service_type: string;
  start_date: string;
  end_date: string;
  people_needed: number;
  description: string;
};

export async function sendNewBookingNotification(bookingData: BookingDataPayload) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return { success: false, error: 'Email credentials not configured' }
  }

  try {
    const subject = `🚀 New Quote Request from ${bookingData.contact_name}`
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #141312; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0c0b0a; padding: 20px; text-align: center;">
          <h2 style="color: #f3c892; margin: 0;">New Quote Request</h2>
        </div>
        <div style="padding: 30px;">
          <p><strong>Name:</strong> ${bookingData.contact_name}</p>
          <p><strong>Email:</strong> ${bookingData.contact_email}</p>
          <p><strong>Phone:</strong> ${bookingData.contact_phone}</p>
          <p><strong>Service:</strong> ${bookingData.service_type}</p>
          <p><strong>Staff Needed:</strong> ${bookingData.people_needed}</p>
          <p><strong>Dates:</strong> ${bookingData.start_date} to ${bookingData.end_date || 'N/A'}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f8f8; border-radius: 8px;">
            <p style="margin:0; font-weight:bold;">Message / Details:</p>
            <p style="white-space: pre-wrap; margin-top: 8px; color: #555;">${bookingData.description || 'No additional details provided.'}</p>
          </div>
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://mvgroups.online/login" style="background-color: #f3c892; color: #0c0b0a; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
              View in Dashboard
            </a>
          </div>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `"MV Groups Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Send to Admin
      subject,
      html: htmlContent,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send booking notification email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}
