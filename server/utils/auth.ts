import * as jose from 'jose'
import type { H3Event } from 'h3'
import { findByEmail } from '../database/actions/users'
import type { UserTransformer } from '../transformers/user'

const jwtKey = Buffer.from(process.env.NUXT_SESSION_PASSWORD as string, 'utf-8')

export const requireAuth = async (event: H3Event) => {
  try {
    const { user } = await requireUserSession(event)

    return user
  } catch (error) {
    console.log('Error on requireAuth', error)

    const authorization = getHeader(event, 'authorization')

    if (authorization) {
      try {
        return await verifyJWT(authorization)
      } catch (error) {
        console.log('Error on verifyJWT', error)
      }
    }

    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
}

export const authenticateUser = async (email: string, password: string) => {
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

  return user
}

export const generateJWT = async (user: UserTransformer) => {
  return await new jose.SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(Buffer.from(process.env.NUXT_SESSION_PASSWORD as string, 'utf-8'))
}

export const verifyJWT = async (jwt: string) => {
  const decoded = await jose.jwtVerify(jwt, jwtKey)

  return decoded.payload
}
