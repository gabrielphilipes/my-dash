import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/scripts', '@nuxt/ui', '@nuxthub/core'],

  css: ['~/assets/css/tailwinds.css'],

  // Modules
  vite: {
    plugins: [tailwindcss()]
  }
})
