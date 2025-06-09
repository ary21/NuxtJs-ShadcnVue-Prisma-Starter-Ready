export default defineEventHandler(async (event) => {
  deleteCookie(event, 'token', {
    httpOnly: true,
    path: '/',
  })

  return {
    message: 'Logout successful'
  }
})