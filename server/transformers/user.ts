import type { InsertUser } from '~~/server/database/schema/user'

export const userTransformer = (user: InsertUser) => {
  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    email: user.email
  }
}
