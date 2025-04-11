import { RegisterSchema } from '~~/server/validations/auth'
import { userTransformer } from '~~/server/transformers/user'
import { findByEmail, createUserWithPassword } from '~~/server/database/actions/users'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => RegisterSchema.safeParse(body))

  if (!body.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  const email = body.data.email.toLowerCase()
  const checkEmail = await findByEmail(email)
  if (checkEmail.length > 0) {
    throw createError({ statusCode: 400, statusMessage: 'Email already exists' })
  }

  const userData = await createUserWithPassword({
    name: body.data.name,
    email,
    password: await hashPassword(body.data.password)
  })

  // TODO: Send email verification

  const userResponse = userTransformer(userData)
  await setUserSession(event, { user: userResponse, maxAge: 60 * 60 * 24 * 7 }) // 7 days

  setResponseStatus(event, 201)
  return userResponse
})
