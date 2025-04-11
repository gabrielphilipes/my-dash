import { like } from 'drizzle-orm'
import { ofetch } from 'ofetch'
import { $fetch } from '@nuxt/test-utils/e2e'
import { useDB } from '../../../server/utils/database'
import { afterAll, describe, expect, it } from 'vitest'
import { users } from '../../../server/database/schema/user'

afterAll(async () => {
  // Remove users test
  await useDB().delete(users).where(like(users.email, '%@mydash.test')).execute()
})

describe('Register email/password', () => {
  // Success cases
  it('should register a new user with valid data', async () => {
    const payload = {
      name: 'John Doe',
      email: 'john.doe@mydash.test',
      password: 'Password@123',
      passwordConfirmation: 'Password@123',
      terms: true
    }

    const response = await $fetch('/api/auth/register', { method: 'POST', body: payload })
    expect(response.id).toMatch(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ) // uuid
    expect(response.name).toBe(payload.name)
    expect(response.email).toBe(payload.email)
    expect(response.avatar).toBeNull()
  })

  it('should set user session', async () => {
    const payload = {
      name: 'John Doe',
      email: 'john.doe.session@mydash.test',
      password: 'Password@123',
      passwordConfirmation: 'Password@123',
      terms: true
    }

    /**
     * Use `ofetch.raw` to get the raw response
     * and get the cookie from the response headers
     * then use it to make the me request
     */
    const registerResponse = await ofetch.raw('/api/auth/register', {
      method: 'POST',
      body: payload,
      credentials: 'include',
      baseURL: 'http://localhost:3000'
    })

    const cookie = registerResponse.headers.get('set-cookie') || ''

    const meResponse = await ofetch('/api/me', {
      headers: { cookie },
      baseURL: 'http://localhost:3000'
    })

    expect(meResponse.id).toBe(registerResponse._data.id)
  })

  it('should convert email to lowercase', async () => {
    const payload = {
      name: 'John Doe',
      email: 'John.Doe.Uppercase@mydash.test',
      password: 'Password@123',
      passwordConfirmation: 'Password@123',
      terms: true
    }

    const response = await $fetch('/api/auth/register', { method: 'POST', body: payload })

    expect(response.email).toBe(payload.email.toLowerCase())
  })

  // Error cases
  it('should validate fields', async () => {
    const payload = {
      name: 'John Doe',
      email: 'john.doe@mydash.test',
      password: 'Password@123',
      passwordConfirmation: 'Password@123',
      terms: true
    }

    // Missing name
    const payloadWithoutName = { ...payload, name: '' }
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: payloadWithoutName
      })
    } catch (error) {
      expect(error.data.statusCode).toBe(400)
      expect(error.data.statusMessage).toBe('Invalid body')
    }

    // Missing email
    const payloadWithoutEmail = { ...payload, email: '' }
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: payloadWithoutEmail
      })
    } catch (error) {
      expect(error.data.statusCode).toBe(400)
      expect(error.data.statusMessage).toBe('Invalid body')
    }

    // Missing password
    const payloadWithoutPassword = { ...payload, password: '' }
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: payloadWithoutPassword
      })
    } catch (error) {
      expect(error.data.statusCode).toBe(400)
      expect(error.data.statusMessage).toBe('Invalid body')
    }

    // Missing password confirmation
    const payloadWithoutPasswordConfirmation = { ...payload, passwordConfirmation: '' }
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: payloadWithoutPasswordConfirmation
      })
    } catch (error) {
      expect(error.data.statusCode).toBe(400)
      expect(error.data.statusMessage).toBe('Invalid body')
    }

    // Missing terms
    const payloadWithoutTerms = { ...payload, terms: false }
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: payloadWithoutTerms
      })
    } catch (error) {
      expect(error.data.statusCode).toBe(400)
      expect(error.data.statusMessage).toBe('Invalid body')
    }
  })

  it('should email already exists', async () => {
    const payload = {
      name: 'John Doe',
      email: 'john.doe.already.exists@mydash.test',
      password: 'Password@123',
      passwordConfirmation: 'Password@123',
      terms: true
    }

    await $fetch('/api/auth/register', { method: 'POST', body: payload })

    try {
      await $fetch('/api/auth/register', { method: 'POST', body: payload })
    } catch (error) {
      expect(error.data.statusCode).toBe(400)
      expect(error.data.statusMessage).toBe('Email already exists')
    }
  })
})
