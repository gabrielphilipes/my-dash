import { userTransformer } from '~~/server/transformers/user'
import { findOAuthUser } from '~~/server/database/actions/oauth'
import { OAuthProvider } from '~~/server/database/schema/users_oauth'
import { createUserWithOAuth, findByEmail } from '~~/server/database/actions/users'

export default defineOAuthFacebookEventHandler({
  config: { scope: ['email', 'public_profile'] },
  async onSuccess(event, { user }) {
    try {
      console.log('user', user)

      const provider = OAuthProvider.FACEBOOK
      const existUser = await findByEmail(user.email)

      // NEW USER
      if (!existUser) {
        const newUser = await createUserWithOAuth({
          name: user.name,
          email: user?.email || `${user.id}@facebook.com`,
          provider,
          provider_user_id: user.id
        })

        // Set login user
        const userResponse = userTransformer(newUser)
        await setUserSession(event, { user: userResponse, maxAge: 60 * 60 * 24 * 7 }) // 7 days

        return sendRedirect(event, '/onboarding')
      }

      // USER HAS REGISTERED WITH FACEBOOK
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
