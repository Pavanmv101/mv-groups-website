'use server';

import nodemailer from 'nodemailer';

export async function requestBrochure(email: string) {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Invalid email address' };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"MV Groups" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your MV Groups Company Profile',
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #141312; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0c0b0a; padding: 30px; text-align: center;">
            <h1 style="color: #f3c892; margin: 0; font-size: 24px; letter-spacing: 2px;">MV GROUPS</h1>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="margin-top: 0; color: #141312;">Thank you for your interest!</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #666;">
              We're thrilled you want to learn more about how MV Groups can power your next event. You can download our comprehensive Company Profile by clicking the button below.
            </p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="https://mvgroups.online/MV_Groups_Profile.pdf" style="background-color: #f3c892; color: #0c0b0a; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block;">
                Download Profile PDF
              </a>
            </div>
            <p style="font-size: 16px; line-height: 1.6; color: #666;">
              If you have immediate staffing or event requirements, feel free to reply to this email or reach us directly at <strong>+91 93805 58344</strong>.
            </p>
          </div>
          <div style="background-color: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} MV Groups. All rights reserved.<br/>
            Bengaluru, Karnataka
          </div>
        </div>
      `,
    };

    // Send to the user
    await transporter.sendMail(mailOptions);

    // Optional: Send a notification to the admin that someone downloaded the brochure
    const adminNotification = {
      from: `"MV Groups System" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: '🚀 New Brochure Download Lead',
      html: `
        <h3>New Brochure Download</h3>
        <p>A new user has requested the company profile.</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    };
    await transporter.sendMail(adminNotification);

    return { success: true };
  } catch (error) {
    console.error('Error sending brochure email:', error);
    return { success: false, error: 'Failed to send email. Please try again later.' };
  }
}
