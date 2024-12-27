import { z } from 'zod'
import { userModel } from '~~/server/database/models/UserModel'

const ConfirmRegisterSchema = z.object({
  email: z.string().email(),
  pin: z.string().length(6)
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => ConfirmRegisterSchema.parse(body))

  if (!body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required',
      message: 'E-mail inválido!'
    })
  }

  const user = await userModel.findByEmail(body.email)

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
      message: 'E-mail inválido!'
    })
  }

  if (!user.emailVerificationCode) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Empty email verification code',
      message: 'Código de verificação inválido!'
    })
  }

  if (!(await verifyPassword(user.emailVerificationCode, body.pin))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid pin',
      message: 'Código de verificação inválido!'
    })
  }

  await userModel.update(user.id, {
    emailVerified: new Date(),
    emailVerificationCode: null
  })
})
