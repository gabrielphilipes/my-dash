import type { UserTransformer } from '~~/server/transformers/user'

export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/login?unauthenticated=true')
  }

  const user = useState<UserTransformer | undefined>('user', () => undefined)

  const { data, error } = await useFetch('/api/me')

  if (error.value) {
    const message = error.value?.data?.message
    console.error(message)
    return navigateTo(`/logout?information=${message}`)
  }

  user.value = data.value?.user
})
