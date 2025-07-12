"use server"

import { ErrorResponseSchema, ForgotPasswordSchema, SucessSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}

export async function forgotPassword(prevState: ActionStateType, formData: FormData) {

  const forgotPassword = ForgotPasswordSchema.safeParse({
    email: formData.get('email')
  })

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.errors.map(error => error.message),
      success: ''
    }
  }

  const url = `${process.env.API_URL}/auth/forgot-password`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: forgotPassword.data.email
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