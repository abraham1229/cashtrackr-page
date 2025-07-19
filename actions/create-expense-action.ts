"use server"

import { DraftExpenseSchema } from "@/src/schemas"

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


  return {
    errors: [],
    success: ''
  }
}