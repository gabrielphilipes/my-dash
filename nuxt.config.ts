export default defineNuxtConfig({
  compatibilityDate: "2024-12-24",

  future: {
    compatibilityVersion: 4,
  },

  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss"],

  devtools: { enabled: true },

  // Fixed new structure of Nuxt 4
  srcDir: "app",
  serverDir: "server",

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  experimental: {
    sharedPrerenderData: true,
    defaults: {
      useAsyncData: {
        deep: false,
      },
    },
  },

  // Modules
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
});
