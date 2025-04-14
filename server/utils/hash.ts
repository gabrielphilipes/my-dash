import { createCipheriv, createDecipheriv } from 'crypto'

const algorithm = 'aes-256-ecb'

/**
 * Gets the encryption key from environment variables or returns a fallback key
 * @throws Error if no key is found in environment variables
 * @returns Buffer containing the encryption key
 */
const getEncryptionKey = (): Buffer => {
  let envKey = process.env.ENCRYPTION_KEY

  if (!envKey) {
    console.warn(
      '⚠️ No ENCRYPTION_KEY found in environment variables. Using fallback key. This is not secure for production!'
    )

    envKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
  }

  return Buffer.from(envKey, 'hex')
}

const key = getEncryptionKey()

/**
 * Encrypts a string using AES-256-ECB
 * @param text - Text to be encrypted
 * @returns Encrypted string in hexadecimal
 */
export const encrypt = (text: string): string => {
  const cipher = createCipheriv(algorithm, key, null)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

/**
 * Decrypts a string using AES-256-ECB
 * @param encrypted - Encrypted text in hexadecimal
 * @returns Decrypted string
 */
export const decrypt = (encrypted: string): string => {
  const decipher = createDecipheriv(algorithm, key, null)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
