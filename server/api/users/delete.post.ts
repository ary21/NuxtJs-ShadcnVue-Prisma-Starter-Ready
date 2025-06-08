import { prisma } from "~/prisma/client"
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const ids = body.ids as string[]

  if (!Array.isArray(ids) || ids.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'IDs must be a non-empty array' })
  }

  const deleted = await prisma.user.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      deletedAt: new Date(),
    }
  })

  return {
    deletedCount: deleted.count,
    ids,
  }
})
