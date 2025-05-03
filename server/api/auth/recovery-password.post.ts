import type { H3Event } from 'h3'
import { findByEmail } from '~~/server/database/actions/users'
import { sendEmailToRecoveryPassword } from '~~/server/utils/email'
import { RecoveryPasswordSchema } from '~~/server/validations/auth'

export default defineEventHandler(async (event: H3Event) => {
  // Check e-mail
  const body = await readValidatedBody(event, (body) => RecoveryPasswordSchema.safeParse(body))

  if (!body.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  // Find user by e-mail
  const user = await findByEmail(body.data.email)
  if (!user) {
    // Waiting 2 seconds to not reveal if the e-mail exists or not, helping to avoid brute force attacks
    await new Promise((resolve) => setTimeout(resolve, 80))

    setResponseStatus(event, 201)
    return sendNoContent(event)
  }

  // Send email
  await sendEmailToRecoveryPassword(user.name, user.email)

  setResponseStatus(event, 201)
  return sendNoContent(event)
})
