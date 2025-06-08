import { eq } from 'drizzle-orm'
import { users } from '../schema/user'
import type { InsertUser, User } from '../schema/user'
import type { OAuthProvider } from '../schema/users_oauth'
import { createOAuthUser, type InsertOAuthUser } from './oauth'

interface InsertUserWithOAuth extends InsertUser {
  provider: OAuthProvider
  provider_user_id: string
}

export const findByEmail = async (email: string): Promise<User | null> => {
  try {
    const [user] = await useDB().select().from(users).where(eq(users.email, email))

    return user
  } catch (error) {
    console.error(error)
    throw new Error('Failed to find user by email')
  }
}

export const createUserWithPassword = async (data: InsertUser): Promise<InsertUser> => {
  try {
    const [user] = await useDB().insert(users).values(data).returning()

    return user
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create user')
  }
}

export const createUserWithOAuth = async (data: InsertUserWithOAuth): Promise<InsertUser> => {
  try {
    const userData = {
      ...data,
      email_verified_at: new Date()
    }
    const [user] = await useDB().insert(users).values(userData).returning()

    try {
      const oauthData: InsertOAuthUser = {
        provider: data.provider,
        provider_user_id: data.provider_user_id,
        user_id: user.id
      }

      await createOAuthUser(oauthData)
    } catch (error) {
      console.error(error)
      await removeUser(user.id)
      throw new Error('Failed to create oauth')
    }

    return user
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create user and oauth')
  }
}

export const confirmAccount = async (email: string) => {
  try {
    const user = await useDB()
      .update(users)
      .set({ email_verified_at: new Date() })
      .where(eq(users.email, email))
      .returning()

    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    return user
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to confirm account' })
  }
}

export const removeUser = async (id: string) => {
  try {
    await useDB().delete(users).where(eq(users.id, id))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to remove user')
  }
}

export const updateUserPassword = async (email: string, password: string) => {
  try {
    const hashedPassword = await hashPassword(password)
    const [user] = await useDB()
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, email))
      .returning()

    return user
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to update user password' })
  }
}
