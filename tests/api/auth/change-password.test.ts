import type { H3Error } from 'h3'
import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { afterAll, describe, expect, it } from 'vitest'
import { endpointApi, testUserData } from '../../setup'
import { encrypt } from '~~/server/utils/hash'
import type { ChangePasswordToken } from '~~/server/types/auth'

afterAll(async () => {
  // Reset password to user
  setup({
    server: true,
    host: endpointApi
  })

  const tokenPayload: ChangePasswordToken = {
    email: testUserData.email,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60) // 1 hour from now
  }
  const token = encrypt(JSON.stringify(tokenPayload))

  const payload = {
    token,
    password: testUserData.password,
    confirmPassword: testUserData.password
  }

  await $fetch(`/api/auth/change-password`, {
    method: 'POST',
    body: payload
  })
})

describe('Change password', () => {
  // Success cases
  it('should change password with valid token', async () => {
    // Create a valid token
    const tokenPayload: ChangePasswordToken = {
      email: testUserData.email,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60) // 1 hour from now
    }
    const token = encrypt(JSON.stringify(tokenPayload))

    const payload = {
      token,
      password: 'NewPassword@123',
      confirmPassword: 'NewPassword@123'
    }

    const response = await $fetch(`${endpointApi}/api/auth/change-password`, {
      method: 'POST',
      body: payload
    })

    expect(response).toBe('')

    // Verify new password works
    const loginPayload = {
      email: testUserData.email,
      password: 'NewPassword@123'
    }

    const loginResponse = await $fetch(`${endpointApi}/api/auth/login`, {
      method: 'POST',
      body: loginPayload
    })

    expect(loginResponse).toBeDefined()
  })

  // Error cases
  it('should validate required fields', async () => {
    const payload = {
      token: '',
      password: '',
      confirmPassword: ''
    }

    try {
      await $fetch(`${endpointApi}/api/auth/change-password`, {
        method: 'POST',
        body: payload
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(400)
      expect(errorObject.data.statusMessage).toBe('Invalid body')
    }
  })

  it('should not change password with invalid token', async () => {
    const payload = {
      token: 'invalid-token',
      password: 'NewPassword@123',
      confirmPassword: 'NewPassword@123'
    }

    try {
      await $fetch(`${endpointApi}/api/auth/change-password`, {
        method: 'POST',
        body: payload
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(400)
      expect(errorObject.data.statusMessage).toBe(
        'Token inválido! Por favor, solicite um novo link de recuperação de senha.'
      )
    }
  })

  it('should not change password with expired token', async () => {
    // Create an expired token
    const tokenPayload: ChangePasswordToken = {
      email: testUserData.email,
      expiresAt: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
    }
    const token = encrypt(JSON.stringify(tokenPayload))

    const payload = {
      token,
      password: 'NewPassword@123',
      confirmPassword: 'NewPassword@123'
    }

    try {
      await $fetch(`${endpointApi}/api/auth/change-password`, {
        method: 'POST',
        body: payload
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(400)
      expect(errorObject.data.statusMessage).toBe(
        'Token expirado! Por favor, solicite um novo link de recuperação de senha.'
      )
    }
  })

  it('should not change password with non-existent user', async () => {
    // Create a valid token for non-existent user
    const tokenPayload: ChangePasswordToken = {
      email: 'nonexistent@mydash.test',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60) // 1 hour from now
    }
    const token = encrypt(JSON.stringify(tokenPayload))

    const payload = {
      token,
      password: 'NewPassword@123',
      confirmPassword: 'NewPassword@123'
    }

    try {
      await $fetch(`${endpointApi}/api/auth/change-password`, {
        method: 'POST',
        body: payload
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(400)
      expect(errorObject.data.statusMessage).toBe(
        'Token inválido! Por favor, solicite um novo link de recuperação de senha.'
      )
    }
  })
})
