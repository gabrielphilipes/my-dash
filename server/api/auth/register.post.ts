import { render } from '@vue-email/render'
import { encrypt } from '~~/server/utils/hash'
import { useEmail } from '~~/server/utils/email'
import { RegisterSchema } from '~~/server/validations/auth'
import { userTransformer } from '~~/server/transformers/user'
import ConfirmAccount from '~~/app/emails/ConfirmAccount.vue'
import { findByEmail, createUserWithPassword, removeUser } from '~~/server/database/actions/users'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => RegisterSchema.safeParse(body))

  if (!body.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  const email = body.data.email.toLowerCase()
  const checkEmail = await findByEmail(email)
  if (checkEmail) {
    throw createError({ statusCode: 400, statusMessage: 'Email already exists' })
  }

  const userData = await createUserWithPassword({
    name: body.data.name,
    email,
    password: await hashPassword(body.data.password)
  })

  try {
    const token = encrypt(email as string)
    const verificationUrl = `${process.env.SITE_URL}/api/auth/verify?token=${token}`

    const emailContent = await render(ConfirmAccount, {
      name: body.data.name,
      verificationUrl
    })

    await useEmail({
      toEmail: email,
      toName: body.data.name,
      subject: 'Confirme sua conta',
      html: emailContent
    })
  } catch (error) {
    await removeUser(userData.id as string)

    console.error('Error sending email', error, email)
    throw createError({ statusCode: 500, statusMessage: 'Error sending email verification' })
  }

  const userResponse = userTransformer(userData)
  await setUserSession(event, { user: userResponse, maxAge: 60 * 60 * 24 * 7 }) // 7 days

  setResponseStatus(event, 201)
  return userResponse
})
