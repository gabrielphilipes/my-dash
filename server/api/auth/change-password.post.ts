import type { H3Event } from 'h3'
import type { ChangePasswordToken } from '~~/server/types/auth'
import { ChangePasswordSchema } from '~~/server/validations/auth'
import { findByEmail, updateUserPassword } from '~~/server/database/actions/users'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readValidatedBody(event, (body) => ChangePasswordSchema.safeParse(body))

  if (!body.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  let token: ChangePasswordToken
  try {
    token = JSON.parse(decrypt(body.data.token)) as ChangePasswordToken
  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Token inválido! Por favor, solicite um novo link de recuperação de senha.'
    })
  }

  // Find user by e-mail
  const user = await findByEmail(token.email)
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token inválido! Por favor, solicite um novo link de recuperação de senha.'
    })
  }

  // Check if the token is expired
  const dateLimit = new Date(Date.now() - 1000 * 60 * 60) // 1 hour
  const dateToken = new Date(token.expiresAt)
  if (dateToken < dateLimit) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token expirado! Por favor, solicite um novo link de recuperação de senha.'
    })
  }

  await updateUserPassword(user.email, body.data.password)

  setResponseStatus(event, 201)
  return sendNoContent(event)
})
