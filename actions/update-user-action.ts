"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, SucessSchema, UpdateUserSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}

export default async function updateUser(prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
  const userData = UpdateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!userData.success) {
    return {
      errors: userData.error.errors.map(error => error.message),
      success: ''
    }
  }

  const token = getToken()
  const url = `${process.env.API_URL}/auth/user`
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: userData.data.name,
      email: userData.data.email,
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