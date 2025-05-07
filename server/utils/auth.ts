import * as jose from 'jose'
import type { H3Event } from 'h3'
import { type User, UserStatus } from '../database/schema/user'
import { findByEmail } from '../database/actions/users'
import type { UserTransformer } from '../transformers/user'

const jwtKey = Buffer.from(process.env.NUXT_SESSION_PASSWORD as string, 'utf-8')

const validateAuth = async (event: H3Event): Promise<UserTransformer | null> => {
  try {
    const { user } = await requireUserSession(event)

    return user as UserTransformer
  } catch (error) {
    console.log('Error on requireAuth', error)

    const authorization = getHeader(event, 'authorization')

    if (!authorization) {
      return null
    }

    try {
      return await verifyJWT(authorization)
    } catch (error) {
      console.log('Error on verifyJWT', error)
    }

    return null
  }
}

export const requireAuth = async (event: H3Event): Promise<UserTransformer> => {
  const user = await validateAuth(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Acesso não autorizado' })
  }

  const userToValidate = await findByEmail(user.email)

  if (!userToValidate) {
    throw createError({ statusCode: 401, statusMessage: 'E-mail/Senha incorretos' })
  }

  validateUser(userToValidate)

  return user
}

export const validateUser = (user: User): void => {
  if (user.status !== UserStatus.ACTIVE) {
    console.info(`User ${user.email} is not active`)
    throw createError({ statusCode: 401, message: 'Seu usuário não está mais ativo!' })
  }

  // TODO: Check subscription status
}

export const authenticateUser = async (email: string, password: string): Promise<User> => {
  const user = await findByEmail(email)

  if (!user) {
    console.info(`User ${email} not found`)
    throw createError({ statusCode: 401, statusMessage: 'E-mail/Senha incorretos' })
  }

  // Check password
  const checkPass = await verifyPassword(user.password as string, password)
  if (!checkPass) {
    console.info(`Password incorrect for user ${user.email}`)
    throw createError({ statusCode: 401, statusMessage: 'E-mail/Senha incorretos' })
  }

  // Confirm account
  if (!user.email_verified_at) {
    // Resend email
    await sendEmailToConfirmAccount(user.id, user.name, user.email)

    console.info(`Account ${user.email} not confirmed`)
    throw createError({
      statusCode: 401,
      statusMessage: 'E-mail não verificado: por favor, acesse seu e-mail e confirme sua conta!'
    })
  }

  validateUser(user)

  return user
}

export const generateJWT = async (user: UserTransformer) => {
  return await new jose.SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(Buffer.from(process.env.NUXT_SESSION_PASSWORD as string, 'utf-8'))
}

export const verifyJWT = async (jwt: string): Promise<UserTransformer> => {
  const decoded = await jose.jwtVerify(jwt, jwtKey)

  return decoded.payload as unknown as UserTransformer
}
