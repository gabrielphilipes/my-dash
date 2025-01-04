// import { verifyToken } from '~~/server/utils/jwt-auth'

const authMiddleware = defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  // Only apply middleware to API routes
  if (!path.startsWith('/api/')) {
    return
  }

  // Define public path patterns that should skip authentication
  const publicPathPatterns = [
    '/api/auth/*',
    '/api/_hub/*',
    '/api/payment/webhook/*'
    // Add any other public paths here
  ]

  // Check if the current path matches any of the public patterns
  const isPublicPath = publicPathPatterns.some((pattern) => {
    const regexPattern = pattern.replace('*', '.*')
    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(path)
  })

  if (isPublicPath) {
    return
  }

  const session = await getUserSession(event)
  if (session.user) {
    event.context.user = session.user
    return
  }

  throw createError({
    statusCode: 401,
    message: 'Unauthorized'
  })

  // TODO: Implement JWT Auth
})

export default authMiddleware
