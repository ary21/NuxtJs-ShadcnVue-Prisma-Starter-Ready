/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "~/prisma/client";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!;
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID is required",
    });
  }

  const existingUser = await prisma.user.findUnique({ where: { id } });

  if (!existingUser) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  if (body.email) {
    const existingEmail = await prisma.user.findUnique({
      where: { email: body.email, NOT: { id } },
    });

    if (existingEmail) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email already used",
      });
    }
  }

  const updateData: any = {
    name: body.name,
    email: body.email,
    updatedAt: new Date(),
  };

  // Only update password if it's provided and not empty
  if (body.password && body.password.trim() !== "") {
    updateData.password = await bcrypt.hash(body.password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return {
    success: true,
    data: updatedUser,
  };
});
