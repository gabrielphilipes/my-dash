import { RegisterSchema } from '~~/server/validations/auth'
import { userModel } from '~~/server/database/models/UserModel'
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => RegisterSchema.parse(body))

  // Check if email is already registered
  if (await userModel.findByEmail(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exists',
      message: 'E-mail já cadastrado!'
    })
  }

  const payload = {
    name: body.name,
    email: body.email
  }

  const emailVerificationCode = nanoid(10) // TODO: Send email to confirm email
  const user = await userModel.createUsingPassword(payload, body.password, emailVerificationCode)

  if (!user) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      message: 'Erro ao criar usuário. Por favor, tente novamente mais tarde.'
    })
  }

  console.table({
    name: user.name,
    email: user.email,
    emailVerificationCode: user.emailVerificationCode
  })

  return user
})
