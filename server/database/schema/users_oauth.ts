import { pgTable, text, timestamp, pgEnum, index } from 'drizzle-orm/pg-core'
import { users } from './user'

export enum OAuthProvider {
  GOOGLE = 'google',
  GITHUB = 'github',
  FACEBOOK = 'facebook'
}

export const oauthProvider = pgEnum(
  'provider',
  Object.values(OAuthProvider) as [string, ...string[]]
)

export const usersOAuth = pgTable(
  'users_oauth',
  {
    user_id: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    provider: oauthProvider('provider').notNull(),
    provider_user_id: text('provider_user_id').notNull(),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => ({
    userProviderIdx: index('user_provider_idx').on(table.user_id, table.provider),
    providerUserIdIdx: index('provider_user_id_idx').on(table.provider_user_id)
  })
)

export type UserOAuth = typeof usersOAuth.$inferSelect
export type InsertUserOAuth = typeof usersOAuth.$inferInsert
