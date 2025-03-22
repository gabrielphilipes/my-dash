import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  modules: ['@nuxt/icon', '@nuxt/scripts', '@nuxt/ui', '@nuxthub/core', '@nuxtjs/google-fonts'],

  css: ['~/assets/css/general.css'],

  // Modules
  vite: {
    plugins: [tailwindcss()]
  },

  googleFonts: {
    families: {
      Raleway: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    display: 'swap',
    download: true,
    preload: true
  }
})
