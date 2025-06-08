import { userTransformer } from '~~/server/transformers/user'
import { findOAuthUser } from '~~/server/database/actions/oauth'
import { OAuthProvider } from '~~/server/database/schema/users_oauth'
import { createUserWithOAuth, findByEmail } from '~~/server/database/actions/users'

export default defineOAuthGitHubEventHandler({
  config: { emailRequired: true },
  async onSuccess(event, { user }) {
    try {
      const provider = OAuthProvider.GITHUB
      const email = user.email
      const existUser = await findByEmail(email)

      // NEW USER
      if (!existUser) {
        const newUser = await createUserWithOAuth({
          name: user.name,
          email: user.email,
          provider,
          provider_user_id: user.id
        })

        // Set login user
        const userResponse = userTransformer(newUser)
        await setUserSession(event, { user: userResponse, maxAge: 60 * 60 * 24 * 7 }) // 7 days

        return sendRedirect(event, '/onboarding')
      }

      // USER HAS REGISTERED WITH GITHUB
      const existOAuthUser = await findOAuthUser(existUser.id, provider)
      if (existOAuthUser) {
        const userResponse = userTransformer(existUser)
        await setUserSession(event, { user: userResponse, maxAge: 60 * 60 * 24 * 7 }) // 7 days

        return sendRedirect(event, '/?alreadyRegistered=true')
      }

      // USER HAS REGISTERED WITH EMAIL
      return sendRedirect(event, `/register?registerWithEmail=true&email=${user.email}`)
    } catch (error) {
      console.error(error)
      return sendRedirect(event, '/register?oauthError=true')
    }
  }
})
