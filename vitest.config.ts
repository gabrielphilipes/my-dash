import { defineVitestConfig } from '@nuxt/test-utils/config'
import { loadEnv } from 'vite'

export default defineVitestConfig({
  test: {
    setupFiles: ['./tests/setup.ts'],
    hookTimeout: 30000,
    testTimeout: 30000,
    env: loadEnv('', process.cwd(), ''),
    environment: 'nuxt'
  }
})
