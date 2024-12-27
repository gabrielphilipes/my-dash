import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp' }),
  emailVerificationCode: text('emailVerificationCode'),
  avatarUrl: text('avatarUrl'),
  permissions: text('permissions', { mode: 'json' }).$default(() => ['user']),
  password: text('password'),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  createdAt: integer('createdAt', { mode: 'timestamp' }).$default(() => new Date())
})

export type CreateUser = typeof users.$inferInsert
