import * as z from "zod/v4";

export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, "first name is required"),
    lastName: z.string().optional(),
    email: z.email(),
    password: z
      .string()
      .min(8, "at least 8 charactors")
      .max(16, "less than 16 charactors"),
  })

export type TRegisterSchema = z.infer<typeof RegisterSchema>;