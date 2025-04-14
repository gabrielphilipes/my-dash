import { decrypt } from '~~/server/utils/hash'
import { confirmAccount, findByEmail } from '~~/server/database/actions/users'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const token = query.token as string

    if (!token) {
      throw new Error('Token not provided')
    }

    const email = decrypt(token)

    const user = await findByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    await confirmAccount(email)

    return sendRedirect(event, '/')
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 400, statusMessage: 'Token inválido ou expirado' })
  }
})
