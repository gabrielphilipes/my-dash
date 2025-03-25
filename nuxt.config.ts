import tailwindcss from '@tailwindcss/vite'
import type { NuxtPage } from 'nuxt/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  srcDir: 'app',
  serverDir: 'server',

  modules: ['@nuxt/icon', '@nuxt/scripts', '@nuxt/ui', '@nuxtjs/google-fonts', 'vue-sonner/nuxt'],

  css: ['~/assets/css/general.css'],

  nitro: {
    preset: 'vercel'
  },

  hooks: {
    'pages:extend'(pages: NuxtPage[]) {
      // Add the auth routes
      pages.push({ path: '/login', file: '~/pages/auth/Login.vue' })
      pages.push({ path: '/register', file: '~/pages/auth/Register.vue' })
      pages.push({ path: '/recovery-password', file: '~/pages/auth/RecoveryPassword.vue' })
      pages.push({ path: '/change-password', file: '~/pages/auth/ChangePassword.vue' })
    }
  },

  // Modules
  vite: {
    plugins: [tailwindcss()]
  },

  googleFonts: {
    families: {
      Raleway: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    display: 'swap',
    download: true,
    preload: true
  }
})
