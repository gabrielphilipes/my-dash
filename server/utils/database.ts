import { drizzle } from 'drizzle-orm/node-postgres'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env') })

export const dbCredentials = {
  host: process.env.POSTGRES_HOST!,
  database: process.env.POSTGRES_DB!,
  port: parseInt(process.env.POSTGRES_PORT!),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  ssl: false
}

export const useDB = (): ReturnType<typeof drizzle> => {
  return drizzle({ connection: dbCredentials })
}
