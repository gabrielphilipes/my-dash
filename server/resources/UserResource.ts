import type { CreateUser, SelectUser } from '../database/schema'

export const UserResource = (user: CreateUser | SelectUser) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    permissions: user.permissions
  }
}
