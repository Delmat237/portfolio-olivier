// src/lib/email.ts
import nodemailer from 'nodemailer'

export interface EmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  }

  async sendEmail({ to, subject, html, replyTo }: EmailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"Portfolio Olivier Mogonel" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
        replyTo
      })

      console.log('Message sent: %s', info.messageId)
    } catch (error) {
      console.error('Error sending email:', error)
      throw new Error('Failed to send email')
    }
  }

  generateContactEmailTemplate(data: {
    name: string
    email: string
    subject: string
    message: string
  }): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Nouveau message - Portfolio</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%); color: white; padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Nouveau message</h1>
              <p style="margin: 8px 0 0 0; opacity: 0.9;">Portfolio Olivier Mogonel</p>
            </div>

            <!-- Content -->
            <div style="padding: 32px 24px; background-color: #f8fafc;">
              <!-- Contact Info -->
              <div style="background-color: white; padding: 24px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h2 style="color: #1f2937; margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">Informations du contact</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 80px;">Nom :</td>
                    <td style="padding: 8px 0; color: #1f2937;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email :</td>
                    <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #374151;">Sujet :</td>
                    <td style="padding: 8px 0; color: #1f2937;">${data.subject}</td>
                  </tr>
                </table>
              </div>

              <!-- Message -->
              <div style="background-color: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h2 style="color: #1f2937; margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">Message</h2>
                <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                  <p style="margin: 0; line-height: 1.6; color: #374151; white-space: pre-wrap;">${data.message}</p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #e5e7eb; padding: 20px 24px; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                Ce message a été envoyé depuis le portfolio d'Olivier Mogonel
              </p>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">
                © 2024 Olivier Mogonel - Tous droits réservés
              </p>
            </div>
          </div>
        </body>
      </html>
    `
  }
}

export const emailService = new EmailService()