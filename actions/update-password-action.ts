"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, SucessSchema, UpdatePasswordSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}

export async function updatePassword(prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {

  const userPassword = UpdatePasswordSchema.safeParse({
    current_password: formData.get('current_password'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation')
  })

  if (!userPassword.success) {
    return {
      errors: userPassword.error.errors.map(error => error.message),
      success: ''
    }
  }

  const token = getToken()
  const url = `${process.env.API_URL}/auth/update-password`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      current_password: userPassword.data.current_password,
      new_password: userPassword.data.password
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