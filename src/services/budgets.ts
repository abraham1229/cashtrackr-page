import { cache } from "react"
import getToken from "../auth/token"
import { notFound } from "next/navigation"
import { BudgetAPIResponseSchema } from "../schemas"

export const getBudgetById = cache(async (id: string) => { //cache wont use another request
  const token = getToken()
  const url = `${process.env.API_URL}/budgets/${id}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const json = await res.json()

  if (!res.ok) {
    notFound()
  }

  const budget = BudgetAPIResponseSchema.parse(json)

  return budget
})