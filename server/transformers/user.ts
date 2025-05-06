import type { InsertUser } from '~~/server/database/schema/user'

export interface UserTransformer {
  id: string
  name: string
  avatar: string
  email: string
}

export const userTransformer = (user: InsertUser): UserTransformer => {
  return {
    id: user.id as string,
    name: user.name as string,
    avatar: user.avatar as string,
    email: user.email as string
  }
}
