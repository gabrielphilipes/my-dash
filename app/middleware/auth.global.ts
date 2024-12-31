export default defineNuxtRouteMiddleware((to) => {
  const ignorePaths = [
    '/entrar',
    '/cadastrar',
    '/confirmar-cadastro',
    '/esqueci-senha',
    '/redefinir-senha',
    '/compliance/'
  ]

  if (ignorePaths.includes(to.path)) {
    return
  }

  const { user } = useUserSession()

  if (!user.value) {
    return navigateTo({ path: '/entrar', query: { error: 'unauthorized' } })
  }
})
