import { z } from 'zod'
import { userModel } from '~~/server/database/models/UserModel'
import { userCodeModel } from '~~/server/database/models/UserCodeModel'
import { TokenType } from '~~/server/database/schema'

const ResetPasswordRequestSchema = z.object({
  email: z.string().email(),
  pin: z.string().length(6),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  const t = await useTranslation(event)
  const body = await readValidatedBody(event, (body) => ResetPasswordRequestSchema.parse(body))

  const user = await userModel.findByEmail(body.email)
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
      message: t('auth.resetPassword.errors.invalidData')
    })
  }

  const token = await userCodeModel.findValidCode(user.id, body.pin, TokenType.PASSWORD_RESET)

  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid pin',
      message: t('auth.resetPassword.errors.invalidCode')
    })
  }

  if (token.expiresAt < new Date()) {
    await userCodeModel.deleteCode(token.id)

    throw createError({
      statusCode: 400,
      statusMessage: 'Token expired',
      message: t('auth.resetPassword.errors.expiredCode')
    })
  }

  await Promise.all([
    userModel.updatePassword(user.id, body.password),
    userCodeModel.deleteCode(token.id)
  ])
})
