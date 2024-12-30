import { H3Event } from 'h3'
import { LoginSchema } from '~~/server/validations/auth'
import { userModel } from '~~/server/database/models/UserModel'
import { UserResource } from '~~/server/resources/UserResource'

export default defineEventHandler(async (event: H3Event) => {
  const t = await useTranslation(event)

  const body = await readValidatedBody(event, (body) => LoginSchema.parse(body))

  const user = await userModel.findByEmail(body.email)
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
      message: t('auth.login.errors.credentials')
    })
  }

  if (!user.password) {
    const oauthAccounts = await userModel.findOAuthAccounts(user.id)

    if (oauthAccounts.length > 0) {
      const provider = oauthAccounts[0]?.provider
      throw createError({
        statusCode: 401,
        statusMessage: 'OAuth account',
        message: t('auth.login.errors.oauthAccount', { provider })
      })
    }

    throw createError({
      statusCode: 401,
      statusMessage: 'Password not set',
      message: t('auth.login.errors.credentials')
    })
  }

  const isValidPassword = await verifyPassword(user.password, body.password)
  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid password',
      message: t('auth.login.errors.credentials')
    })
  }

  if (user.emailVerified === null) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Email not verified',
      message: t('auth.login.errors.emailNotVerified')
    })
  }

  const userResource = UserResource(user)
  await setUserSession(event, { user: userResource })

  return {
    user: userResource
  }
})
