import { z } from 'zod'
import { userModel } from '~~/server/database/models/UserModel'
import { userCodeModel } from '~~/server/database/models/UserCodeModel'
import { TokenType } from '~~/server/database/schema'

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

  const token = await userCodeModel.findValidCode(
    user.id,
    await hashPassword(body.pin),
    TokenType.EMAIL_VERIFICATION
  )

  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid pin',
      message: 'Código de verificação inválido!'
    })
  }

  if (token.expiresAt < new Date()) {
    await userCodeModel.deleteCode(token.id)
    throw createError({
      statusCode: 400,
      statusMessage: 'Token expired',
      message: 'Código de verificação expirado!'
    })
  }

  await Promise.all([
    userModel.update(user.id, { emailVerified: new Date() }),
    userCodeModel.deleteCode(token.id)
  ])
})
