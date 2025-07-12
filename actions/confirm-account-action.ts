"use server"

import { ErrorResponseSchema, SucessSchema, TokenSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}
export async function confirmAccount(token: string, prevState: ActionStateType) {

  const confirmToken = TokenSchema.safeParse(token)

  if (!confirmToken.success) {
    return {
      errors: confirmToken.error.errors.map(error => error.message),
      success: ''
    }
  }

  //make request
  const url = `${process.env.API_URL}/auth/confirm-account`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: confirmToken.data
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

  const sucess = SucessSchema.parse(json)

  return {
    errors: [],
    success: sucess
  }
}