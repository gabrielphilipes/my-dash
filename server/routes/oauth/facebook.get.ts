import { OAuthProvider } from '~~/server/database/schema/users_oauth'
import { createOAuthHandler } from '~~/server/utils/oauth-handler'

export default defineOAuthFacebookEventHandler({
  config: { scope: ['email', 'public_profile'] },
  onSuccess: createOAuthHandler(OAuthProvider.FACEBOOK)
})
