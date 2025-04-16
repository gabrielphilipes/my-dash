import { LoginSchema, type LoginSchemaType } from '~~/server/validations/auth'
import { findByEmail } from '~~/server/database/actions/users'
import { sendEmailToConfirmAccount } from '~~/server/utils/email'
import { userTransformer } from '~~/server/transformers/user'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => LoginSchema.safeParse(body))

  if (!body.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  const { email, password, remember }: LoginSchemaType = body.data

  // Find email
  const user = await findByEmail(email)

  if (!user) {
    console.log('User not found')
    throw createError({ statusCode: 401, statusMessage: 'E-mail/Senha incorretos' })
  }

  // Check password
  const checkPass = await verifyPassword(user.password as string, password)
  if (!checkPass) {
    console.log('Password incorrect')
    throw createError({ statusCode: 401, statusMessage: 'E-mail/Senha incorretos' })
  }

  // Confirm account
  if (!user.email_verified_at) {
    // Resend email
    await sendEmailToConfirmAccount(user.id, user.name, user.email)

    console.log('Account not confirmed')
    throw createError({
      statusCode: 401,
      statusMessage: 'E-mail não verificado: por favor, acesse seu e-mail e confirme sua conta!'
    })
  }

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
