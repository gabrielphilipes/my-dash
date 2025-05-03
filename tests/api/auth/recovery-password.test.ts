import { ofetch } from 'ofetch'
import type { H3Error } from 'h3'
import { $fetch } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'
import { endpointApi, endpointMailCrab, testUserData } from '../../setup'
import { decrypt } from '~~/server/utils/hash'

describe('Recovery password', () => {
  // Success cases
  it('should send recovery password email for valid email', async () => {
    await ofetch(`${endpointMailCrab}/api/delete-all`, { method: 'POST' }) // Delete all emails

    const payload = {
      email: testUserData.email
    }

    const response = await $fetch(`${endpointApi}/api/auth/recovery-password`, {
      method: 'POST',
      body: payload
    })

    expect(response).toBe('')

    // Verify email was sent
    const emails = await ofetch(`${endpointMailCrab}/api/messages`)
    expect(emails.length).toBe(1)
    expect(emails[0].to[0].email).toBe(testUserData.email)
    expect(emails[0].to[0].name).toBe(testUserData.name)
    expect(emails[0].subject).toBe(`Recupere sua senha ${testUserData.name}`)
  })

  it('should return 201 for invalid email', async () => {
    const payload = {
      email: 'invalid@mydash.test'
    }

    const response = await $fetch(`${endpointApi}/api/auth/recovery-password`, {
      method: 'POST',
      body: payload
    })

    expect(response).toBe('')
  })

  it('should contain valid recovery link in email with correct token payload', async () => {
    await ofetch(`${endpointMailCrab}/api/delete-all`, { method: 'POST' }) // Delete all emails

    const payload = {
      email: testUserData.email
    }

    await $fetch(`${endpointApi}/api/auth/recovery-password`, {
      method: 'POST',
      body: payload
    })

    // Get email content
    const emails = await ofetch(`${endpointMailCrab}/api/messages`)
    const emailId = emails[0].id
    const emailContent = await ofetch(`${endpointMailCrab}/api/message/${emailId}`)

    // Extract recovery link from email content
    const recoveryLink = emailContent.html.match(`${process.env.SITE_URL}[^"]+`)?.[0]
    expect(recoveryLink).toBeDefined()
    expect(recoveryLink).toContain('/change-password?token=')

    // Get token from URL
    const token = recoveryLink?.split('token=')[1]
    expect(token).toBeDefined()

    // Decrypt token and verify payload
    const decryptedToken = decrypt(token as string)
    const tokenPayload = JSON.parse(decryptedToken)

    expect(tokenPayload.email).toBe(testUserData.email)
    expect(tokenPayload.expiresAt).toBeDefined()

    // Verify expiration date is 24 hours from now
    const expiresAt = new Date(tokenPayload.expiresAt)
    const now = new Date()
    const expectedExpiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    // Allow 5 seconds of difference due to execution time
    const timeDifference = Math.abs(expiresAt.getTime() - expectedExpiresAt.getTime())
    expect(timeDifference).toBeLessThan(5000)
  })

  // Error cases
  it('should validate email field', async () => {
    const payload = {
      email: ''
    }

    try {
      await ofetch(`${endpointApi}/api/auth/recovery-password`, {
        method: 'POST',
        body: payload
      })
    } catch (error) {
      const errorObject = error as { data: H3Error }
      expect(errorObject.data.statusCode).toBe(400)
      expect(errorObject.data.statusMessage).toBe('Invalid body')
    }
  })
})
