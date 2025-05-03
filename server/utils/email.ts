import nodemailer from 'nodemailer'
import { render } from '@vue-email/render'
import { encrypt } from '~~/server/utils/hash'
import ConfirmAccount from '~/emails/ConfirmAccount.vue'
import RecoveryPassword from '~/emails/RecoveryPassword.vue'
import { removeUser } from '~~/server/database/actions/users'

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

interface ResponseSendEmail {
  success: boolean
  messageId: string
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

export const useEmail = async ({
  toEmail,
  toName,
  subject,
  text,
  html
}: EmailPayload): Promise<ResponseSendEmail> => {
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

export const sendEmailToConfirmAccount = async (
  id: string,
  name: string,
  email: string
): Promise<ResponseSendEmail> => {
  try {
    const token = encrypt(email as string)
    const verificationUrl = `${process.env.SITE_URL}/api/auth/verify?token=${token}`

    const emailContent = await render(ConfirmAccount, {
      name: name,
      verificationUrl
    })

    return useEmail({
      toEmail: email,
      toName: name,
      subject: 'Confirme sua conta',
      html: emailContent
    })
  } catch (error) {
    await removeUser(id)

    console.error('Error sending email', error, email)
    throw createError({ statusCode: 500, statusMessage: 'Error sending email verification' })
  }
}

export const sendEmailToRecoveryPassword = async (
  name: string,
  email: string
): Promise<ResponseSendEmail> => {
  try {
    const payloadToken = {
      email,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 day
    }

    const token = encrypt(JSON.stringify(payloadToken))
    const recoveryUrl = `${process.env.SITE_URL}/change-password?token=${token}`

    const emailContent = await render(RecoveryPassword, {
      name: name,
      recoveryUrl
    })

    return useEmail({
      toEmail: email,
      toName: name,
      subject: 'Recupere sua senha ' + name,
      html: emailContent
    })
  } catch (error) {
    console.error('Error sending email', error, email)
    throw createError({ statusCode: 500, statusMessage: 'Error sending email', cause: error })
  }
}
