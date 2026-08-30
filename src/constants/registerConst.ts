import type { StatusCodes } from "http-status-codes"
import z from "zod"

export const zodRegisterSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Minimum first name is three characters")
      .max(50, "Maximum first name is 50 characters")
      .regex(
        /^[a-zA-Z\s\-']+$/,
        "First name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(11).regex(/^\d+$/, "Must contain only digits"),
    password: z.string().min(8, "Minimum password is 8 characters"),
    confirmPassword: z.string().min(8),
    newsletter: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password value must match!",
    path: ["confirmPassword"],
  })

export type ZodRegisterType = z.infer<typeof zodRegisterSchema>

export interface RegisterResponse {
  status: StatusCodes
  message: string
}
