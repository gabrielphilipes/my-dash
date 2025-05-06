import { authenticateUser, generateJWT } from '~~/server/utils/auth'
import { userTransformer } from '~~/server/transformers/user'
import { LoginSchema, type LoginSchemaType } from '~~/server/validations/auth'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => LoginSchema.safeParse(body))

  if (!body.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  const { email, password }: LoginSchemaType = body.data

  const user = await authenticateUser(email, password)

  // Set session
  const userResponse = userTransformer(user)

  const jwt = await generateJWT(userResponse)

  return {
    token: jwt
  }
})
