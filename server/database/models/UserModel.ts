import { useDB } from '~~/server/utils/useDB'
import * as schema from '../schema'
import { eq } from 'drizzle-orm'
import type { CreateUser, SelectUser, SelectOAuthAccount } from '../schema'
import { userCodeModel } from './UserCodeModel'

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

      const user = await useDB()
        .insert(schema.users)
        .values({
          ...data,
          password: hashedPassword
        })
        .returning()
        .get()

      if (user) {
        await userCodeModel.create({
          userId: user.id,
          type: schema.TokenType.EMAIL_VERIFICATION,
          code: hashedEmailVerificationCode,
          expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000) // 72 hours (3 days)
        })
      }

      return user
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

  async findOAuthAccounts(userId: string): Promise<SelectOAuthAccount[]> {
    try {
      return await useDB()
        .select()
        .from(schema.oauthAccounts)
        .where(eq(schema.oauthAccounts.userId, userId))
        .all()
    } catch (error) {
      console.error(error)
      return []
    }
  }
}

export const userModel = new UserModel()
