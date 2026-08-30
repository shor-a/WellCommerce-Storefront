import type { StatusCodes } from "http-status-codes"
import z from "zod"

export const zodLoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
})

export type ZodLoginType = z.infer<typeof zodLoginSchema>

export const demoEmail = "demo@wellcommerce.com"
export const demoPassword = "D3m0P4$$"

export type LoginType = Omit<ZodLoginType, "rememberMe">

export const allUsers: LoginType[] = [
  { email: demoEmail, password: demoPassword },
]

export interface LoginResponse {
  status: StatusCodes
  message: string
}
