export default defineEventHandler(async (event) => {
  // Check if user is authenticated
  await requireUserSession(event)

  // Clear user session
  await clearUserSession(event)

  return sendNoContent(event)
})
