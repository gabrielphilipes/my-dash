import { eq } from 'drizzle-orm'
import { users } from '../schema/user'
import type { InsertUser } from '../schema/user'

export const findByEmail = async (email: string) => {
  try {
    return await useDB().select().from(users).where(eq(users.email, email))
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
