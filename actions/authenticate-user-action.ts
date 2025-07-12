"use server"
import { cookies } from 'next/headers'
import { ErrorResponseSchema, LoginSchema, SucessSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}

export async function authenticate(prevState: ActionStateType, formData: FormData) {

  const loginCredential = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const auth = LoginSchema.safeParse(loginCredential)


  if (!auth.success) {
    return {
      errors: auth.error.errors.map(error => error.message),
      success: ''
    }
  }

  // make request

  const url = `${process.env.API_URL}/auth/login`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: auth.data.email,
      password: auth.data.password,
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

  // Set cookies
  cookies().set({
    name: 'CASHTRACKR_token',
    value: sucess,
    httpOnly: true,
    path: '/'
  })

  return {
    errors: [],
    success: sucess
  }
}