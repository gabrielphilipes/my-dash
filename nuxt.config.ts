export default defineNuxtConfig({
  compatibilityDate: "2024-12-24",

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxthub/core",
    "nuxthub-ratelimit",
  ],

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

  css: ["~/assets/css/typography.css"],

  nitro: {
    compressPublicAssets: true,
    typescript: {
      tsConfig: {
        compilerOptions: {
          strict: true,
          types: ["@cloudflare/workers-types"],
        },
      },
    },
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

  googleFonts: {
    families: {
      Faustina: [400, 500, 600, 700],
      "Open Sans": [300, 400, 500, 700],
    },
    display: "swap",
    download: true,
    preload: true,
  },

  hub: {
    blob: true,
    database: true,
    kv: true,
  },

  nuxtHubRateLimit: {
    routes: {
      "/api/*": {
        maxRequests: 45,
        intervalSeconds: 60,
      },
    },
  },
});
