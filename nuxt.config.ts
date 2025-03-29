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
      // Add the custom routes
      const customRoutes = require('./app/utils/custom-routes')
      pages.push(...customRoutes)
    }
  },

  // Modules
  vite: {
    plugins: [tailwindcss()]
  },

  googleFonts: {
    families: {
      'DM Sans': [400, 500, 600, 700]
    },
    display: 'swap',
    download: true,
    preload: true
  }
})
