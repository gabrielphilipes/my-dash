import type { H3Error } from 'h3'
import { ofetch } from 'ofetch'
import { $fetch } from '@nuxt/test-utils/e2e'
import { beforeAll, describe, expect, it } from 'vitest'
import { endpointApi } from '../../setup'

const userData = {
  name: 'John Doe',
  email: 'john.doe@mydash.test',
  password: 'Password@123'
}

beforeAll(async () => {
  // Register user
  const payload = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    passwordConfirmation: userData.password,
    terms: true
  }

  try {
    await $fetch('/api/auth/register', { method: 'POST', body: payload })
  } catch (error) {
    if (error.status === 400) {
      console.log(`User already exists: ${userData.email}`)
    }
  }
})

describe('Logout users', () => {
  // Success cases
  it('should logout a user', async () => {
    // Login user
    const loginResponse = await ofetch.raw(`${endpointApi}/api/auth/login`, {
      method: 'POST',
      body: {
        email: userData.email,
        password: userData.password
      }
    })

    const cookie = loginResponse.headers.get('set-cookie') || ''

    const logoutResponse = await $fetch(`${endpointApi}/api/auth/logout`, {
      headers: { cookie },
      method: 'POST'
    })

    expect(logoutResponse).toBeUndefined()
  })

  // Error cases
  it('should return 401 if user is not authenticated', async () => {
    try {
      await ofetch.raw(`${endpointApi}/api/auth/logout`, {
        method: 'POST'
      })
    } catch (error) {
      const errorData = error as { data: H3Error }
      expect(errorData.data.statusCode).toBe(401)
      expect(errorData.data.message).toBe('Unauthorized')
    }
  })
})
