import { ForgotPasswordSchema } from '~~/server/validations/auth'
import { userModel } from '~~/server/database/models/UserModel'
import { userCodeModel } from '~~/server/database/models/UserCodeModel'
import { TokenType } from '~~/server/database/schema'
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
  const t = await useTranslation(event)
  const body = await readValidatedBody(event, (body) => ForgotPasswordSchema.parse(body))

  const user = await userModel.findByEmail(body.email)
  if (!user) return

  const oauthAccounts = await userModel.findOAuthAccounts(user.id)
  if (oauthAccounts.length > 0) {
    const provider = oauthAccounts[0]?.provider
    throw createError({
      statusCode: 400,
      statusMessage: 'OAuth account',
      message: t('auth.forgotPassword.errors.oauthAccount', { provider })
    })
  }

  const resetCode = nanoid(6)
  const hashedCode = await hashPassword(resetCode)

  await userCodeModel.create({
    userId: user.id,
    code: hashedCode,
    type: TokenType.PASSWORD_RESET,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30)
  })

  // TODO: Enviar e-mail com o código de recuperação

  if (process.env.NODE_ENV === 'development') {
    console.table({
      email: user.email,
      resetCode
    })
  }

  return
})
