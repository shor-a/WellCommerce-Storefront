import z from "zod"

// Tab discriminant

export const SettingsTab = {
  PERSONAL: "personal",
  PASSWORD: "password",
  SHIPPING: "shipping",
} as const

export type SettingsTab = (typeof SettingsTab)[keyof typeof SettingsTab]

export const settingsTabs: { value: SettingsTab; label: string }[] = [
  { value: SettingsTab.PERSONAL, label: "Personal Info" },
  { value: SettingsTab.PASSWORD, label: "Change Password" },
  { value: SettingsTab.SHIPPING, label: "Shipping Address" },
]

// Personal info schema

export const zodPersonalSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .regex(
      /^[a-zA-Z\s\-']+$/,
      "Only letters, spaces, hyphens and apostrophes"
    ),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(8, "Minimum 8 digits")
    .regex(/^\+?[\d\s\-()]+$/, "Enter a valid phone number"),
})

export type ZodPersonalType = z.infer<typeof zodPersonalSchema>

// Change password schema

export const zodChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Minimum 8 characters"),
    newPassword: z
      .string()
      .min(8, "Minimum 8 characters"),
    confirmPassword: z.string().min(8, "Minimum 8 characters"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type ZodChangePasswordType = z.infer<typeof zodChangePasswordSchema>

// Shipping address schema

export const zodShippingSchema = z.object({
  name: z.string().trim().min(2, "Minimum 2 characters"),
  line1: z.string().trim().min(5, "Enter a full address"),
  city: z.string().trim().min(2, "Enter a city"),
  country: z.string().trim().min(2, "Enter a country"),
  phone: z
    .string()
    .min(8, "Minimum 8 digits")
    .regex(/^\+?[\d\s\-()]+$/, "Enter a valid phone number"),
})

export type ZodShippingType = z.infer<typeof zodShippingSchema>
