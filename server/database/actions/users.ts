import { eq } from 'drizzle-orm'
import { users } from '../schema/user'
import type { InsertUser } from '../schema/user'

export const findByEmail = async (email: string) => {
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
