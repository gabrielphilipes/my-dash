export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        login: user.login,
        avatar: user.avatar_url
      },
      secure: {
        accessToken: tokens.accessToken
      }
    })

    return sendRedirect(event, '/')
  }
})
