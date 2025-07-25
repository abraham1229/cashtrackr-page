'use server'

import getToken from "@/src/auth/token"
import { DraftBudgetSchema, ErrorResponseSchema, SucessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
  errors: string[],
  success: string
}

export async function createBudget(prevState: ActionStateType, formData: FormData) {

  const budget = DraftBudgetSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount')
  })

  if (!budget.success) {
    return {
      errors: budget.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  const token = getToken()

  const url = `${process.env.API_URL}/budgets`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount
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

  revalidatePath('/admin')
  
  return {
    errors: [],
    success: success
  }
}