import type { NuxtPage } from 'nuxt/schema'

export default <NuxtPage[]>[
  // Auth routes
  { path: '/login', file: '~/pages/auth/login.vue' },
  { path: '/register', file: '~/pages/auth/register.vue' },
  { path: '/recovery-password', file: '~/pages/auth/recovery-password.vue' },
  { path: '/change-password', file: '~/pages/auth/change-password.vue' },
  { path: '/onboarding', file: '~/pages/auth/onboarding.vue' }
]
