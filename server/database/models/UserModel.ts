import { useDB } from '~~/server/utils/useDB'
import * as schema from '../schema'
import { eq } from 'drizzle-orm'
import type { CreateUser } from '../schema'

class UserModel {
  async findByEmail(email: string) {
    try {
      const [existingUser] = await useDB()
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))

      return !!existingUser
    } catch (error) {
      console.error(error)
      return false
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
}

export const userModel = new UserModel()
