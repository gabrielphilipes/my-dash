export default defineNuxtConfig({
  compatibilityDate: '2024-12-24',

  future: {
    compatibilityVersion: 4
  },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxthub/core',
    'nuxthub-ratelimit',
    'nuxt-auth-utils',
    '@nuxtjs/i18n',
    '@nuxt/content'
  ],

  devtools: { enabled: true },

  // Fixed new structure of Nuxt 4
  srcDir: 'app',
  serverDir: 'server',

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },

  css: ['~/assets/css/general.css'],

  nitro: {
    compressPublicAssets: true,
    typescript: {
      tsConfig: {
        compilerOptions: {
          strict: true,
          types: ['@cloudflare/workers-types']
        }
      }
    }
  },

  experimental: {
    sharedPrerenderData: true,
    defaults: {
      useAsyncData: {
        deep: false
      }
    }
  },

  runtimeConfig: {
    session: {
      name: 'dash-session',
      password: process.env.NUXT_SESSION_PASSWORD ?? ''
    },

    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET
      },
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET
      },
      facebook: {
        clientId: process.env.NUXT_OAUTH_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_FACEBOOK_CLIENT_SECRET
      }
    }
  },

  // Modules
  googleFonts: {
    families: {
      Faustina: [400, 500, 600, 700],
      Roboto: [300, 400, 500, 700]
    },
    display: 'swap',
    download: true,
    preload: true
  },

  hub: {
    blob: true,
    database: true,
    kv: true
  },

  nuxtHubRateLimit: {
    routes: {
      '/api/*': {
        maxRequests: 45,
        intervalSeconds: 60
      },

      '/api/auth/*': {
        maxRequests: 5,
        intervalSeconds: 60
      }
    }
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'pt-BR',
    experimental: {
      localeDetector: 'localeDetector.ts'
    },
    locales: [
      {
        code: 'pt-BR',
        language: 'pt-BR',
        files: [
          'pt-BR/auth.ts',
          'pt-BR/validations.ts',
          'pt-BR/layouts.ts',
          'pt-BR/compliance.ts',
          'pt-BR/dashboard.ts'
        ],
        name: 'Português (BR)',
        flag: '🇧🇷'
      },
      {
        code: 'en',
        language: 'en-US',
        files: [
          'en/auth.ts',
          'en/validations.ts',
          'en/layouts.ts',
          'en/compliance.ts',
          'en/dashboard.ts'
        ],
        name: 'English',
        flag: '🇺🇸'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang_redirected',
      redirectOn: 'root'
    }
  }
})
