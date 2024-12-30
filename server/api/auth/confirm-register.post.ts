import { z } from 'zod'
import { userModel } from '~~/server/database/models/UserModel'
import { userCodeModel } from '~~/server/database/models/UserCodeModel'
import { TokenType } from '~~/server/database/schema'

const ConfirmRegisterSchema = z.object({
  email: z.string().email(),
  pin: z.string().length(6)
})

export default defineEventHandler(async (event) => {
  const t = await useTranslation(event)
  const body = await readValidatedBody(event, (body) => ConfirmRegisterSchema.parse(body))

  if (!body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required',
      message: t('auth.confirmRegister.errors.invalidEmail')
    })
  }

  const user = await userModel.findByEmail(body.email)

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
      message: t('auth.confirmRegister.errors.invalidEmail')
    })
  }

  const token = await userCodeModel.findValidCode(user.id, body.pin, TokenType.EMAIL_VERIFICATION)

  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid pin',
      message: t('auth.confirmRegister.errors.invalidCode')
    })
  }

  if (token.expiresAt < new Date()) {
    await userCodeModel.deleteCode(token.id)
    throw createError({
      statusCode: 400,
      statusMessage: 'Token expired',
      message: t('auth.confirmRegister.errors.expiredCode')
    })
  }

  await Promise.all([
    userModel.update(user.id, { emailVerified: new Date() }),
    userCodeModel.deleteCode(token.id)
  ])
})
