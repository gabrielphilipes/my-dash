export default defineEventHandler(async (event) => {
  // Clear user session
  await clearUserSession(event)

  return sendNoContent(event)
})
