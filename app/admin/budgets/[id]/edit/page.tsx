import getToken from "@/src/auth/token"
import { notFound } from "next/navigation"


const getBudgetById = async (id: string) => {
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



  return json
}

export default async function EditBudgetPage({ params }: { params: { id: string } }) {
  const { id } = params

  await getBudgetById(id)

  return (
    <div>editBudgetPage</div>
  )
}
