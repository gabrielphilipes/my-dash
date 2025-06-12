import { and, eq } from 'drizzle-orm'
import { usersOAuth } from '../schema/users_oauth'
import type { OAuthProvider, UserOAuth } from '../schema/users_oauth'

export interface InsertOAuthUser {
  user_id: string
  provider: OAuthProvider
  provider_user_id: string
}

export const createOAuthUser = async (data: InsertOAuthUser): Promise<UserOAuth> => {
  try {
    const [oauth] = await useDB().insert(usersOAuth).values(data).returning()

    return oauth
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to create oauth user' })
  }
}

export const findOAuthUser = async (
  user_id: string,
  provider: OAuthProvider
): Promise<UserOAuth | null> => {
  try {
    const [oauth] = await useDB()
      .select()
      .from(usersOAuth)
      .where(and(eq(usersOAuth.user_id, user_id), eq(usersOAuth.provider, provider)))

    return oauth
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to find oauth user' })
  }
}
