import { authenticateUser } from '~~/server/utils/auth'
import { userTransformer } from '~~/server/transformers/user'
import { LoginSchema, type LoginSchemaType } from '~~/server/validations/auth'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => LoginSchema.safeParse(body))

  if (!body.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  const { email, password, remember }: LoginSchemaType = body.data

  const user = await authenticateUser(email, password)

  // Set session
  const userResponse = userTransformer(user)
  await setUserSession(event, { user: userResponse, maxAge: 60 * 60 * 24 * 7 }) // 7 days

  setResponseStatus(event, 201)

  if (remember) {
    setCookie(event, 'remember_me', email, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
  }

  return sendNoContent(event)
})
