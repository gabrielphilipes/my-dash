import type { RouterConfig } from '@nuxt/schema'

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    // Auth
    { path: '/login', component: () => import('~/pages/auth/Login.vue') },
    { path: '/register', component: () => import('~/pages/auth/Register.vue') },
    { path: '/recovery-password', component: () => import('~/pages/auth/RecoveryPassword.vue') },
    { path: '/change-password', component: () => import('~/pages/auth/ChangePassword.vue') }
  ]
} satisfies RouterConfig
