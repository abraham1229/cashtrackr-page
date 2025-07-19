"use server"

import getToken from "@/src/auth/token"
import { DraftExpenseSchema, ErrorResponseSchema, SucessSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}

export default async function createExpense(budgetId: number, prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {

  const expenseData = {
    name: formData.get('name'),
    amount: formData.get('amount')
  }

  const expense = DraftExpenseSchema.safeParse(expenseData)

  if (!expense.success) {
    return {
      errors: expense.error.errors.map(error => error.message),
      success: ''
    }
  }

  // Generate new expense

  const token = getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount,
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