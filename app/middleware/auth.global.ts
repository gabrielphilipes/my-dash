export default defineNuxtRouteMiddleware((to) => {
  const ignorePaths = [
    '/entrar',
    '/cadastrar',
    '/confirmar-cadastro',
    '/esqueci-senha',
    '/redefinir-senha',
    '/compliance/termos-de-uso',
    '/compliance/politica-de-privacidade'
  ]

  if (ignorePaths.includes(to.path)) {
    return
  }

  const { user } = useUserSession()

  if (!user.value) {
    return navigateTo({ path: '/entrar', query: { error: 'unauthorized' } })
  }
})
