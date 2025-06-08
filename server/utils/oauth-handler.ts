import { userTransformer } from '~~/server/transformers/user'
import { findOAuthUser } from '~~/server/database/actions/oauth'
import type { OAuthProvider } from '~~/server/database/schema/users_oauth'
import { createUserWithOAuth, findByEmail } from '~~/server/database/actions/users'
import type { H3Event } from 'h3'

interface OAuthUser {
  id: string
  name: string
  email: string
  sub?: string // Google
  picture?: string // Google
  avatar_url?: string // GitHub
}

export const createOAuthHandler = (provider: OAuthProvider) => {
  return async (event: H3Event, { user }: { user: OAuthUser }) => {
    try {
      const existUser = await findByEmail(user.email)

      // NEW USER
      if (!existUser) {
        const newUser = await createUserWithOAuth({
          name: user.name,
          email: user.email,
          provider,
          provider_user_id: user.sub || user.id,
          avatar: user?.picture || user?.avatar_url || ''
        })

        // Set login user
        const userResponse = userTransformer(newUser)
        await setUserSession(event, { user: userResponse, maxAge: 60 * 60 * 24 * 7 }) // 7 days

        return sendRedirect(event, '/onboarding')
      }

      // USER HAS REGISTERED WITH PROVIDER
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
}
