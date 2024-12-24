export default defineNuxtConfig({
  // Habilita comportamento do Nuxt 4
  future: {
    compatibilityVersion: 4,
  },

  // Módulos recomendados para o template
  modules: ["@nuxt/devtools", "@nuxtjs/eslint-module"],

  // Configurações de desenvolvimento
  devtools: { enabled: true },

  // Nova estrutura de diretórios do Nuxt 4
  srcDir: "app",

  serverDir: "server",

  // Configurações de runtime
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

  // Configurações de build
  nitro: {
    compressPublicAssets: true,
  },

  // Configurações experimentais recomendadas para Nuxt 4
  experimental: {
    sharedPrerenderData: true,
    defaults: {
      useAsyncData: {
        deep: false, // Melhora performance usando shallow refs
      },
    },
  },

  compatibilityDate: "2024-12-24",
});