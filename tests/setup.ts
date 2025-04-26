import { resolve } from 'path'
import retry from 'async-retry'
import { config } from 'dotenv'
import { ofetch } from 'ofetch'
import { eq } from 'drizzle-orm'
import type { H3Error } from 'h3'
import { beforeAll } from 'vitest'
import { setup } from '@nuxt/test-utils'
import { useDB } from '~~/server/utils/database'
import { users } from '~~/server/database/schema/user'
import type { User } from '~~/server/database/schema/user'
import { userTransformer } from '~~/server/transformers/user'

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

export const testUserData = {
  name: 'Gabriel Silva',
  email: 'gabriel.silva.test@mydash.com.br',
  password: 'Password@123'
}

export const testUser = async () => {
  try {
    const user = await ofetch(`${endpointApi}/api/auth/register`, {
      method: 'POST',
      body: {
        name: testUserData.name,
        email: testUserData.email,
        password: testUserData.password,
        passwordConfirmation: testUserData.password,
        terms: true
      }
    })

    return user
  } catch (error) {
    const errorData = error as { data: H3Error }
    if (errorData.data.statusCode === 400) {
      console.log(`User already exists: ${testUserData.email}`)

      const [user] = await useDB().select().from(users).where(eq(users.email, testUserData.email))

      return userTransformer(user as User)
    }
  }
}

export const testUserLogin = async (email?: string, password?: string): Promise<string> => {
  try {
    const payload = {
      email: email || testUserData.email,
      password: password || testUserData.password
    }

    const loginResponse = await ofetch.raw(`${endpointApi}/api/auth/login`, {
      method: 'POST',
      body: payload
    })

    return loginResponse.headers.get('set-cookie') || ''
  } catch (error) {
    const errorData = error as { data: H3Error }
    if (errorData.data.statusCode === 401) {
      console.log(`User not found: ${email || testUserData.email}`)
    }

    throw error
  }
}
