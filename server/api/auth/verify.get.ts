import { decrypt } from '~~/server/utils/hash'
import { confirmAccount, findByEmail } from '~~/server/database/actions/users'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const token = query?.token

    if (!token) {
      throw createError({ statusCode: 404, statusMessage: 'Token not provided' })
    }

    const email: string = decrypt(token as string)

    const user = await findByEmail(email)

    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'Usuário não encontrado' })
    }

    await confirmAccount(email)

    return sendRedirect(event, '/')
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 400, statusMessage: 'Token inválido ou expirado' })
  }
})
