"use server"

import getToken from "@/src/auth/token"
import { Budget, ErrorResponseSchema, Expense, SucessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
  errors: string[],
  success: string
}

type BudgetAndExpenseId = {
  budgetId: Budget['id'],
  expenseId: Expense['id']
}

export default async function deleteExpense({ budgetId, expenseId }: BudgetAndExpenseId, prevState: ActionStateType): Promise<ActionStateType> {

  const token = getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  const json = await res.json()

  if (!res.ok) {
    const { error } = ErrorResponseSchema.parse(json)
    return {
      errors: [error],
      success: ''
    }
  }

  revalidatePath(`/admin/budgets/${budgetId}`)
  const success = SucessSchema.parse(json)

  return {
    errors: [],
    success: success
  }
}