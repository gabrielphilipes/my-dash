import { test, expect } from 'vitest'
import { $fetch } from '@nuxt/test-utils/e2e'

test('should return hello world', async () => {
  const response = await $fetch('/api')

  expect(response).toEqual({
    message: 'Hello World'
  })
})
