import { ofetch } from 'ofetch'
import type { H3Error } from 'h3'
import { $fetch } from '@nuxt/test-utils/e2e'
import { beforeAll, describe, expect, it } from 'vitest'
import { endpointApi, testUser, testUserData } from '../../setup'

beforeAll(async () => {
  await testUser()
})

describe('Logout users', () => {
  // Success cases
  it('should logout a user', async () => {
    // Login user
    const loginResponse = await ofetch.raw(`${endpointApi}/api/auth/login`, {
      method: 'POST',
      body: {
        email: testUserData.email,
        password: testUserData.password
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
