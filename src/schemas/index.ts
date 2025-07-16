import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  name: z.string()
    .min(1, { message: "Name is required" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" }),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Passwords must match',
  path: ['password_confirmation']
})

export const TokenSchema = z.string({ message: 'Invalid token' })
  .length(6, { message: 'Invalid token' })

export const LoginSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string()
    .min(1, { message: 'Password is required' })
})

export const ForgotPasswordSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
})

export const ResetPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords must match",
  path: ["password_confirmation"]
});

export const DraftBudgetSchema = z.object({
  name: z.string()
    .min(1, { message: 'Budget name is required' }),
  amount: z.coerce.
    number({ message: 'Invalid amount' })
    .min(1, { message: 'Invalid amount' }),
})

export const PasswordValidationSchema = z.string().min(1, {message: 'Password is required'})

export const ErrorResponseSchema = z.object({
  error: z.string()
})

export const SucessSchema = z.string()

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
})

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
})

//Create objects array
export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema) 

export type User = z.infer<typeof UserSchema>
export type Budget = z.infer<typeof BudgetAPIResponseSchema>