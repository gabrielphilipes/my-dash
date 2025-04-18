import { setup } from '@nuxt/test-utils'
import { beforeAll } from 'vitest'
import retry from 'async-retry'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env') })

export const endpointApi = `http://localhost:3000`
export const endpointMailCrab = `http://localhost:${process.env.MAILCRAB_PORT}`

await setup({
  host: 'http://localhost:3000'
})

beforeAll(async () => {
  // Wait for the web server to start
  const waitForWebServer = async () => {
    const fetchStatusPage = async () => {
      const response = await fetch('http://localhost:3000')

      if (!response.ok) {
        console.log('Waiting for web server to start...')
        throw Error()
      }
    }

    return retry(fetchStatusPage, {
      retries: 30, // 30 retries
      maxTimeout: 1000 // Timeout 1 second
    })
  }

  await waitForWebServer()
}, 30000)
