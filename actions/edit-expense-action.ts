"use server"

import getToken from "@/src/auth/token"
import { Budget, DraftExpenseSchema, ErrorResponseSchema, Expense, SucessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
  errors: string[],
  success: string
}

type BudgetAndExpenseId = {
  budgetId: Budget['id'],
  expenseId: Expense['id']
}

export default async function editExpense(
  { budgetId, expenseId }: BudgetAndExpenseId,
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  
  const expense = DraftExpenseSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount')
  })

  if (!expense.success) {
    return {
      errors: expense.error.errors.map(error => error.message),
      success: ''
    }
  }

  const token = getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount
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

  revalidatePath(`/admin/budgets/${budgetId}`)

  const success = SucessSchema.parse(json)

  return {
    errors: [],
    success: success
  }
}