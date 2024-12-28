import { useDB } from '~~/server/utils/useDB'
import * as schema from '../schema'
import { and, eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import type { SelectOAuthAccount, CreateOAuthAccount } from '../schema'

class OAuthAccountModel {
  async findByProviderAccount(
    provider: string,
    providerAccountId: string
  ): Promise<SelectOAuthAccount | null> {
    try {
      const oauthAccount = await useDB()
        .select()
        .from(schema.oauthAccounts)
        .where(
          and(
            eq(schema.oauthAccounts.provider, provider),
            eq(schema.oauthAccounts.providerAccountId, providerAccountId)
          )
        )
        .limit(1)
        .get()

      return oauthAccount ?? null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async create(
    userId: string,
    provider: string,
    providerAccountId: string
  ): Promise<CreateOAuthAccount | null> {
    try {
      const payload = {
        id: nanoid(),
        userId,
        provider,
        providerAccountId
      }

      return await useDB().insert(schema.oauthAccounts).values(payload).returning().get()
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

export const oAuthAccountModel = new OAuthAccountModel()
