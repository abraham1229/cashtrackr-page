import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({message: "Invalid email"}),
  name: z.string()
    .min(1, { message: "Name is required"}),
  password: z.string()
    .min(8, {message: "Password must be at least 8 characters"}),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Passwords must match',
  path: ['password_confirmation']
})