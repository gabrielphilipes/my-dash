import nodemailer from 'nodemailer'

interface BaseEmailPayload {
  toEmail: string
  toName?: string
  subject: string
}

interface TextEmailPayload extends BaseEmailPayload {
  text?: string
  html?: string
}

interface HtmlEmailPayload extends BaseEmailPayload {
  text?: string
  html: string
}

export type EmailPayload = TextEmailPayload | HtmlEmailPayload

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SMTP_HOST || 'sxsjnefo',
  port: parseInt(process.env.MAIL_SMTP_PORT || '10'),
  secure: process.env.MAIL_SMTP_SECURE === 'true',
  auth: {
    user: process.env.MAIL_SMTP_USERNAME || '',
    pass: process.env.MAIL_SMTP_PASSWORD || ''
  }
})

export const useEmail = async ({ toEmail, toName, subject, text, html }: EmailPayload) => {
  try {
    const result = await transporter.sendMail({
      from: {
        address: process.env.MAIL_FROM_EMAIL || '',
        name: process.env.MAIL_FROM_NAME || ''
      },
      to: [
        {
          address: toEmail,
          name: toName || ''
        }
      ],
      subject,
      text,
      html
    })

    if (!result.messageId) {
      throw new Error('Failed to send email')
    }

    return { success: true, messageId: result.messageId }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error sending email',
      cause: error
    })
  }
}
