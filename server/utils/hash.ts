import argon2 from 'argon2'

export async function hashPassword(password: string) {
  return await argon2.hash(password)
}

export async function comparePassword(password: string, hash: string) {
  return await argon2.verify(hash, password)
}
