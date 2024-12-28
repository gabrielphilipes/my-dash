import { H3Event } from 'h3'
import { LoginSchema } from '~~/server/validations/auth'
import { userModel } from '~~/server/database/models/UserModel'
import { UserResource } from '~~/server/resources/UserResource'
import { oAuthAccountModel } from '~~/server/database/models/OAuthAccountModel'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readValidatedBody(event, (body) => LoginSchema.parse(body))

  const user = await userModel.findByEmail(body.email)
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
      message: 'E-mail ou senha inválidos'
    })
  }

  if (!user.password) {
    const oauthAccounts = await userModel.findOAuthAccounts(user.id)

    if (oauthAccounts.length > 0) {
      throw createError({
        statusCode: 401,
        statusMessage: 'OAuth account',
        message: `Esta conta está vinculada ao ${oauthAccounts[0]?.provider}. Por favor, faça login usando ${oauthAccounts[0]?.provider}.`
      })
    }

    throw createError({
      statusCode: 401,
      statusMessage: 'Password not set',
      message: 'E-mail ou senha inválidos'
    })
  }

  const isValidPassword = await verifyPassword(user.password, body.password)
  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid password',
      message: 'E-mail ou senha inválidos'
    })
  }

  const userResource = UserResource(user)
  await setUserSession(event, { user: userResource })

  return {
    user: userResource
  }
})
