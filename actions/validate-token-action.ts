"use server"

import { ErrorResponseSchema, SucessSchema, TokenSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}

export async function validatToken(token: string, prevState: ActionStateType) {

  const resetPasswordToken = TokenSchema.safeParse(token)
  if (!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.errors.map(error => error.message),
      success: ''
    }
  }

  // make request
  const url = `${process.env.API_URL}/auth/validate-token`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: resetPasswordToken.data
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