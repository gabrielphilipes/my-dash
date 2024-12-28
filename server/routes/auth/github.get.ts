import { userModel } from '~~/server/database/models/UserModel'
import { oAuthAccountModel } from '~~/server/database/models/OAuthAccountModel'
import type { CreateUser, SelectUser } from '~~/server/database/schema'

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user, tokens }) {
    const dbUser = await userModel.findByEmail(user.email)
    let newDbUser: CreateUser | null = null

    if (!dbUser) {
      newDbUser = await userModel.createUsingOAuth({
        name: user.name || user.login,
        email: user.email,
        avatarUrl: user.avatar_url
      })

      if (!newDbUser) {
        throw createError({
          statusCode: 500,
          message: 'Erro ao criar usuário'
        })
      }
    } else if (!user.avatar_url && dbUser.avatarUrl) {
      await userModel.updateAvatar(dbUser.id, user.avatar_url)
    }

    const userToSet: SelectUser | CreateUser | null = dbUser ?? newDbUser

    if (!userToSet || !userToSet.id) {
      throw createError({
        statusCode: 500,
        message: 'Erro ao criar usuário'
      })
    }

    const oauthAccount = await oAuthAccountModel.findByProviderAccount('github', user.id)

    if (!oauthAccount) {
      await oAuthAccountModel.create(userToSet.id, 'github', user.id)
    }

    await setUserSession(event, {
      user: {
        id: userToSet.id,
        email: userToSet.email,
        name: userToSet.name,
        avatar: user.avatar_url
      },
      secure: {
        accessToken: tokens.accessToken
      }
    })

    return sendRedirect(event, '/')
  }
})
