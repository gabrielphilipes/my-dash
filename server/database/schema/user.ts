import { pgTable, text, uuid, timestamp, boolean } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(), // uuid
  name: text('name').notNull(),
  avatar: text('avatar'),
  email: text('email').notNull().unique(),
  email_verified_at: timestamp('email_verified_at', { withTimezone: true }),
  password: text('password'),
  two_factor_enabled: boolean('two_factor_enabled').default(false),
  two_factor_secret: text('two_factor_secret'),
  two_factor_recovery_codes: text('two_factor_recovery_codes'),
  onboarded_at: timestamp('onboarded_at', { withTimezone: true }),
  last_activity: timestamp('last_activity', { withTimezone: true }).defaultNow(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
})

export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
