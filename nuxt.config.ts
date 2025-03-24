import tailwindcss from '@tailwindcss/vite'

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
    '@nuxthub/core',
    '@nuxtjs/google-fonts',
    'vue-sonner/nuxt'
  ],

  css: ['~/assets/css/general.css'],

  nitro: {
    preset: 'cloudflare-pages'
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
