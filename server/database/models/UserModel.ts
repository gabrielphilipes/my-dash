import { useDB } from '~~/server/utils/useDB'
import * as schema from '../schema'
import { eq } from 'drizzle-orm'
import type { CreateUser, SelectUser } from '../schema'

class UserModel {
  async findByEmail(email: string): Promise<SelectUser | null> {
    try {
      const user = await useDB()
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))
        .limit(1)
        .get()

      return user ?? null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async createUsingPassword(
    data: CreateUser,
    password: string,
    emailVerificationCode: string
  ): Promise<CreateUser | null> {
    try {
      const hashedPassword = await hashPassword(password)
      const hashedEmailVerificationCode = await hashPassword(emailVerificationCode)

      const dataToInsert = {
        ...data,
        password: hashedPassword,
        emailVerificationCode: hashedEmailVerificationCode
      }

      return await useDB().insert(schema.users).values(dataToInsert).returning().get()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async update(id: string, data: Partial<CreateUser>) {
    return await useDB().update(schema.users).set(data).where(eq(schema.users.id, id))
  }

  async createUsingOAuth(data: {
    name: string
    email: string
    avatarUrl?: string
  }): Promise<CreateUser | null> {
    try {
      const dataToInsert = {
        ...data,
        emailVerified: new Date(),
        permissions: ['user']
      }

      return await useDB().insert(schema.users).values(dataToInsert).returning().get()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async updateAvatar(id: string, avatarUrl: string) {
    try {
      return await useDB()
        .update(schema.users)
        .set({ avatarUrl })
        .where(eq(schema.users.id, id))
        .returning()
        .get()
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

export const userModel = new UserModel()
