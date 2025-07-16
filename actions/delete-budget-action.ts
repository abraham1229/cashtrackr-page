'use server'

import getToken from "@/src/auth/token"
import { Budget, ErrorResponseSchema, PasswordValidationSchema, SucessSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}

export async function deleteBudget(budgetId: Budget['id'], prevState: ActionStateType, formData: FormData) {

  const currentPassword = PasswordValidationSchema.safeParse(formData.get('password'))

  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.errors.map(error => error.message),
      success: ''
    }
  }

  // validate password
  const token = getToken()
  const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`
  const checkPasswordRes = await fetch(checkPasswordUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: currentPassword.data
    })
  })

  const checkPasswordJson = await checkPasswordRes.json()

  if (!checkPasswordJson) {
    return {
      errors: ['Incorrect password'],
      success: ''
    }
  }

  const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`
  const deleteBudgetRes = await fetch(deleteBudgetUrl, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const deleteBudgetJson = await deleteBudgetRes.json()

  if (!deleteBudgetRes.ok) {
    const { error } = ErrorResponseSchema.parse(deleteBudgetJson)
    return {
      errors: [error],
      success: ''
    }
  }

  const success = SucessSchema.parse(deleteBudgetJson)
  return {
    errors: [],
    success: success
  }
}