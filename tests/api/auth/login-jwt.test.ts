import type { H3Error } from 'h3'
import { ofetch } from 'ofetch'
import { beforeAll, describe, expect, it } from 'vitest'
import { endpointApi, testUserData, testUser } from '../../setup'

beforeAll(async () => {
  await testUser()
})

describe('Login users with JWT', () => {
  // Success cases
  it('should return a valid JWT when logging in with correct credentials', async () => {
    const payload = {
      email: testUserData.email,
      password: testUserData.password
    }

    const response = await ofetch(`${endpointApi}/api/auth/login-jwt`, {
      method: 'POST',
      body: payload
    })

    expect(response.token).toBeDefined()
    expect(typeof response.token).toBe('string')
    expect(response.token.split('.').length).toBe(3) // Check if the JWT is valid
  })

  // Error cases
  it('should not login a user with incorrect password', async () => {
    const payload = {
      email: testUserData.email,
      password: 'InvalidPass@123'
    }

    try {
      await ofetch(`${endpointApi}/api/auth/login-jwt`, {
        method: 'POST',
        body: payload
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }

      expect(errorObject.data.statusCode).toBe(401)
      expect(errorObject.data.statusMessage).toBe('E-mail/Senha incorretos')
    }
  })
})
