import { prisma } from "~/prisma/client";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.name || !body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name, email, and password are required",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email already used",
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    data: user,
  };
});
