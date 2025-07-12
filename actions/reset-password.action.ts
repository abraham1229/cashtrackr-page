"use server"

import { ErrorResponseSchema, ResetPasswordSchema, SucessSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}

export async function resetPassword(token: string, prevState: ActionStateType, formData: FormData) {
  const resetPasswordInput = {
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation')
  }

  const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput)

  if (!resetPassword.success) {
    return {
      errors: resetPassword.error.errors.map(error => error.message),
      success: ''
    }
  }

  const url = `${process.env.API_URL}/auth/reset-password/${token}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      password: resetPassword.data.password
    })
  })

  const json = await res.json()

  if (!res.ok) {
    const { error } = ErrorResponseSchema.parse(json)
    return {
      errors: [error],
      success: ''
    }
  }

  const success = SucessSchema.parse(json)
  return {
    errors: [],
    success: success
  }
}