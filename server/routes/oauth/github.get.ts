import { OAuthProvider } from '~~/server/database/schema/users_oauth'
import { createOAuthHandler } from '~~/server/utils/oauth-handler'

export default defineOAuthGitHubEventHandler({
  config: { emailRequired: true },
  onSuccess: createOAuthHandler(OAuthProvider.GITHUB)
})
