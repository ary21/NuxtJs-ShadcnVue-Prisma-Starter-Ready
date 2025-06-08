import { prisma } from "~/prisma/client";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID is required' })

  const user = await prisma.user.findUnique({
    where: { id, deletedAt: null },
  })

  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' })

  return user
})
