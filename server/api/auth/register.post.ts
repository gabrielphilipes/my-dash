import { RegisterSchema } from '~~/server/validations/auth'
import { userModel } from '~~/server/database/models/UserModel'
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
  const t = await useTranslation(event)
  const body = await readValidatedBody(event, (body) => RegisterSchema(t).parse(body))

  if (await userModel.findByEmail(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exists',
      message: t('auth.register.errors.exists')
    })
  }

  const payload = {
    name: body.name,
    email: body.email
  }

  const emailVerificationCode = nanoid(6)
  const user = await userModel.createUsingPassword(payload, body.password, emailVerificationCode)

  if (!user) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      message: t('auth.register.errors.create')
    })
  }

  if (process.env.NODE_ENV === 'development') {
    console.table({
      name: user.name,
      email: user.email,
      emailVerificationCode
    })
  }

  return user
})
