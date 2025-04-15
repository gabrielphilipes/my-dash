import tailwindcss from '@tailwindcss/vite'
import type { NuxtPage } from 'nuxt/schema'
import customRoutes from './app/utils/custom-routes'
import tsconfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  srcDir: 'app',
  serverDir: 'server',

  modules: [
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    'nuxt-auth-utils'
  ],

  css: ['~/assets/css/general.css'],

  nitro: {
    preset: 'vercel',

    rollupConfig: {
      // @ts-expect-error - Rollup plugin type definitions are incomplete for vue plugin
      plugins: [vue()]
    }
  },

  hooks: {
    'pages:extend'(pages: NuxtPage[]) {
      pages.push(...customRoutes) // Add the custom routes
    }
  },

  // Modules
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()]
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
