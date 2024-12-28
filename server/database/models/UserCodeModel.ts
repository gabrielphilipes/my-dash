import { useDB } from '~~/server/utils/useDB'
import * as schema from '../schema'
import { eq, and } from 'drizzle-orm'
import type { CreateUserCode, SelectUserCode } from '../schema'

class UserCodeModel {
  async create(data: CreateUserCode): Promise<SelectUserCode | null> {
    try {
      return await useDB().insert(schema.userCodes).values(data).returning().get()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async findValidCode(
    userId: string,
    code: string,
    type: schema.TokenType
  ): Promise<SelectUserCode | null> {
    try {
      const userCode = await useDB()
        .select()
        .from(schema.userCodes)
        .where(
          and(
            eq(schema.userCodes.userId, userId),
            eq(schema.userCodes.code, code),
            eq(schema.userCodes.type, type)
          )
        )
        .get()

      return userCode ?? null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async deleteCode(id: string) {
    try {
      return await useDB()
        .delete(schema.userCodes)
        .where(eq(schema.userCodes.id, id))
        .returning()
        .get()
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

export const userCodeModel = new UserCodeModel()
