import { ofetch } from 'ofetch'
import type { H3Error } from 'h3'
import { eq, like } from 'drizzle-orm'
import { $fetch } from '@nuxt/test-utils/e2e'
import { useDB } from '~~/server/utils/database'
import { endpointMailCrab } from '~~/tests/setup'
import { users } from '~~/server/database/schema/user'
import { afterAll, describe, expect, it } from 'vitest'

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

    expect(response?.id).toBeDefined()
    expect(response?.name).toBe(payload.name)
    expect(response?.email).toBe(payload.email)
    expect(response?.avatar).toBeNull()
  })

  it('should send email verification', async () => {
    await ofetch(`${endpointMailCrab}/api/delete-all`, { method: 'POST' }) // Delete all emails

    const payload = {
      name: 'John Doe',
      email: 'john.doe.email.verification@mydash.test',
      password: 'Password@123',
      passwordConfirmation: 'Password@123',
      terms: true
    }

    await $fetch(`/api/auth/register`, { method: 'POST', body: payload })

    const email = await ofetch(`${endpointMailCrab}/api/messages`)

    expect(email.length).toBe(1)
    expect(email[0].to[0].email).toBe(payload.email)
    expect(email[0].to[0].name).toBe(payload.name)
    expect(email[0].subject).toBe('Confirme sua conta')
  })

  it('should verify email', async () => {
    await ofetch(`${endpointMailCrab}/api/delete-all`, { method: 'POST' }) // Delete all emails

    const payload = {
      name: 'John Doe',
      email: 'john.doe.email.confirmation@mydash.test',
      password: 'Password@123',
      passwordConfirmation: 'Password@123',
      terms: true
    }

    await $fetch(`/api/auth/register`, { method: 'POST', body: payload })

    // Get email and url to verify
    const getEmails = await ofetch(`${endpointMailCrab}/api/messages`)
    const emailId = getEmails[0].id

    const contentEmail = await ofetch(`${endpointMailCrab}/api/message/${emailId}`)
    const url = contentEmail.html.match(`${process.env.SITE_URL}[^"]+`)[0]

    await ofetch(url, { method: 'GET' }) // Verify email

    // Confirm column `verified_at` is not null
    const user = await useDB().select().from(users).where(eq(users.email, payload.email))
    expect(user[0]?.email_verified_at).not.toBeNull()
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

    expect(meResponse.user.id).toBe(registerResponse._data.id)
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
      email: 'john.doe.missing.fields@mydash.test',
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
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(400)
      expect(errorObject.data.statusMessage).toBe('Invalid body')
    }

    // Missing email
    const payloadWithoutEmail = { ...payload, email: '' }
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: payloadWithoutEmail
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(400)
      expect(errorObject.data.statusMessage).toBe('Invalid body')
    }

    // Missing password
    const payloadWithoutPassword = { ...payload, password: '' }
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: payloadWithoutPassword
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(400)
      expect(errorObject.data.statusMessage).toBe('Invalid body')
    }

    // Missing password confirmation
    const payloadWithoutPasswordConfirmation = { ...payload, passwordConfirmation: '' }
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: payloadWithoutPasswordConfirmation
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(400)
      expect(errorObject.data.statusMessage).toBe('Invalid body')
    }

    // Missing terms
    const payloadWithoutTerms = { ...payload, terms: false }
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: payloadWithoutTerms
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(400)
      expect(errorObject.data.statusMessage).toBe('Invalid body')
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
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(400)
      expect(errorObject.data.message).toBe('Email already exists')
    }
  })
})
