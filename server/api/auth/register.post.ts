import { RegisterSchema } from '~~/server/validations/auth'
import { findByEmail, createUserWithPassword } from '~~/server/database/actions/users'
import { hashPassword } from '~~/server/utils/hash'
import { userTransformer } from '~~/server/transformers/user'

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

  const usersData = await createUserWithPassword({
    name: body.data.name,
    email,
    password: await hashPassword(body.data.password)
  })

  // TODO: Send email verification

  // TODO: Set user login

  setResponseStatus(event, 201)
  return userTransformer(usersData)
})
