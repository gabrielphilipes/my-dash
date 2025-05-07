import type { H3Error } from 'h3'
import { eq } from 'drizzle-orm'
import { ofetch } from 'ofetch'
import { $fetch } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'
import { users } from '~~/server/database/schema/user'
import { useDB } from '~~/server/utils/database'
import { endpointApi, endpointMailCrab, testUserData } from '../../setup'

const updateUserEmailVerifiedAt = async (value: boolean) => {
  await useDB()
    .update(users)
    .set({ email_verified_at: value ? new Date() : null })
    .where(eq(users.email, testUserData.email))
}

describe('Login users', () => {
  // Success cases
  it('should login a user with valid credentials', async () => {
    const payload = {
      email: testUserData.email,
      password: testUserData.password,
      remember: false
    }

    await updateUserEmailVerifiedAt(true)

    const { headers, status } = await ofetch.raw(`${endpointApi}/api/auth/login`, {
      method: 'POST',
      body: payload
    })

    const cookies = headers.get('Set-Cookie')?.split(',')
    expect(status).toBe(201)
    expect(cookies).toBeDefined()
    expect(cookies?.length).toBe(1)

    expect(cookies?.[0]).toContain('nuxt-session')
    expect(cookies?.[0]).toContain('Secure')
    expect(cookies?.[0]).toContain('HttpOnly')

    // Confirm user is logged in
    const meResponse = await ofetch(`${endpointApi}/api/me`, {
      headers: { cookie: cookies?.[0] || '' }
    })

    expect(meResponse.user.id).toBeDefined()
  })

  it('should login a user with remember me', async () => {
    const payload = {
      email: testUserData.email,
      password: testUserData.password,
      remember: true
    }

    await updateUserEmailVerifiedAt(true)

    const { headers, status } = await ofetch.raw(`${endpointApi}/api/auth/login`, {
      method: 'POST',
      body: payload
    })

    const cookies = headers.get('Set-Cookie')?.split(',')
    expect(status).toBe(201)
    expect(cookies).toBeDefined()
    expect(cookies?.length).toBe(2)

    expect(cookies?.[1]).toContain('remember_me')
    expect(cookies?.[0]).toContain('Secure')
    expect(cookies?.[0]).toContain('HttpOnly')

    // Confirm user is logged in
    const meResponse = await ofetch(`${endpointApi}/api/me`, {
      headers: { cookie: cookies?.[0] || '' }
    })

    expect(meResponse.user.id).toBeDefined()
  })

  // Error cases
  it('should not login a user with invalid credentials', async () => {
    const payload = {
      email: testUserData.email,
      password: 'Abc@1234',
      remember: true
    }

    await updateUserEmailVerifiedAt(true)

    try {
      await $fetch(`${endpointApi}/api/auth/login`, {
        method: 'POST',
        body: payload
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(401)
      expect(errorObject.data.statusMessage).toBe('E-mail/Senha incorretos')
    }
  })

  it('should not login a user with unconfirmed account', async () => {
    await ofetch(`${endpointMailCrab}/api/delete-all`, { method: 'POST' }) // Delete all emails

    const payload = {
      email: testUserData.email,
      password: testUserData.password,
      remember: true
    }

    await updateUserEmailVerifiedAt(false)

    try {
      await $fetch(`${endpointApi}/api/auth/login`, {
        method: 'POST',
        body: payload
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(401)
      expect(errorObject.data.statusMessage).toBe(
        'E-mail não verificado: por favor, acesse seu e-mail e confirme sua conta!'
      )
    }

    // Confirm send email
    const getEmails = await ofetch(`${endpointMailCrab}/api/messages`)
    const email = getEmails[0]

    expect(email.subject).toBe('Confirme sua conta')
    expect(email.to[0].email).toBe(testUserData.email)
    expect(email.to[0].name).toBe(testUserData.name)
  })
})
