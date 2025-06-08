import type { Prisma } from "@prisma/client";
import { prisma } from "~/prisma/client";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const page = parseInt(query.page as string) || 1;
  const perPage = parseInt(query.perPage as string) || 10;
  const search = (query.search as string)?.toLowerCase() || "";
  const sortBy = typeof query.sortBy === "string" ? query.sortBy : "createdAt";
  const sortDir = query.sortDir === "asc" ? "asc" : "desc";

  const where: Prisma.UserWhereInput = { deletedAt: null };

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: {
        [sortBy]: sortDir,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  };
});
