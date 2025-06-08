import { OAuthProvider } from '~~/server/database/schema/users_oauth'
import { createOAuthHandler } from '~~/server/utils/oauth-handler'

export default defineOAuthGoogleEventHandler({
  onSuccess: createOAuthHandler(OAuthProvider.GOOGLE)
})
