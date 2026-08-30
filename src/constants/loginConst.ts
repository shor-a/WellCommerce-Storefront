import z from "zod"

export const zodLoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
})

export type ZodLoginType = z.infer<typeof zodLoginSchema>

export const demoEmail = "demo@wellcommerce.com"
export const demoPassword = "D3m0P4$$"

export const demoLogin: ZodLoginType = {
  email: demoEmail,
  password: demoPassword,
  rememberMe: false,
}

export interface LoginResponse {
  status: string
  message: string
}
