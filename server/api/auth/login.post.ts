// server/api/auth/login.post.ts
import { prisma } from "~/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return sendError(
      event,
      createError({ statusCode: 401, message: "Invalid credentials" })
    );
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  setCookie(event, "token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { message: "Login successful", token };
});
