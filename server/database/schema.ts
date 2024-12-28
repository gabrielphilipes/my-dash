import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp' }),
  avatarUrl: text('avatarUrl'),
  permissions: text('permissions', { mode: 'json' }).$default(() => ['user']),
  password: text('password'),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  createdAt: integer('createdAt', { mode: 'timestamp' }).$default(() => new Date())
})

export type CreateUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export const oauthAccounts = sqliteTable(
  'oauthAccounts',
  {
    id: text('id').primaryKey(),
    userId: text('userId').references(() => users.id),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).$onUpdate(() => new Date()),
    createdAt: integer('createdAt', { mode: 'timestamp' }).$default(() => new Date())
  },
  (table) => ({
    userIdProviderIndex: uniqueIndex('userIdProviderIndex').on(table.userId, table.provider),
    providerUniqueIndex: uniqueIndex('providerUniqueIndex').on(
      table.provider,
      table.providerAccountId
    )
  })
)

export type SelectOAuthAccount = typeof oauthAccounts.$inferSelect
export type CreateOAuthAccount = typeof oauthAccounts.$inferInsert

export enum TokenType {
  EMAIL_VERIFICATION = 'email_verification',
  PASSWORD_RESET = 'password_reset',
  MAGIC_LINK = 'magic_link'
}

export const userCodes = sqliteTable('userCodes', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  type: text('type', { enum: Object.values(TokenType) as [string] }).notNull(),
  code: text('code').notNull(),
  expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  createdAt: integer('createdAt', { mode: 'timestamp' }).$default(() => new Date())
})

export type CreateUserCode = typeof userCodes.$inferInsert
export type SelectUserCode = typeof userCodes.$inferSelect
