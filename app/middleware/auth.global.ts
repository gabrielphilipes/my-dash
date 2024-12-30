export default defineNuxtRouteMiddleware((to) => {
  if (
    to.path === '/entrar' ||
    to.path === '/cadastrar' ||
    to.path === '/confirmar-cadastro' ||
    to.path === '/esqueci-senha' ||
    to.path === '/redefinir-senha'
  ) {
    return
  }

  const { user } = useUserSession()

  if (!user.value) {
    return navigateTo({ path: '/entrar', query: { error: 'unauthorized' } })
  }
})
