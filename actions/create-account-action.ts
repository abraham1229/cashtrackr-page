"use server"

import { ErrorResponseSchema, RegisterSchema, SucessSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}

export async function register(prevState: ActionStateType, formData: FormData) {
  const registerData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  }

  // Validate
  const register = RegisterSchema.safeParse(registerData)

  if (!register.success) {
    const errors = register.error.errors.map(error => error.message)

    return {
      errors,
      success: prevState.success
    }
  }
  
  // make request
  const url = `${process.env.API_URL}/auth/create-account`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: register.data.name,
      password: register.data.password,
      email: register.data.email,
    })
  })

  const json = await req.json()

  if (req.status === 409) {
    const error = ErrorResponseSchema.parse(json)
    console.log(error)
    return {
      errors: [error.error],
      success: ''
    }
  }

  const sucess = SucessSchema.parse(json)
  console.log(sucess)

  return {
    errors: [],
    success: sucess
  }
}