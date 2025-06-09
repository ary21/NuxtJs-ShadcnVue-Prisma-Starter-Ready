import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email wajib diisi" })
    .email({ message: "Email tidak valid" }),
  password: z
    .string({ message: "Password wajib diisi" })
    .min(6, { message: "Password wajib diisi" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
