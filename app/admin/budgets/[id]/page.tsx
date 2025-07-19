import { getBudgetById } from "@/src/services/budgets"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const budget = await getBudgetById(params.id)
  return {
    title: `CashTrackr - ${budget.name}`,
    description: `CashTrackr - ${budget.name}`
  }
}

export default async function BudgetDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params

  const budget = await getBudgetById(id)

  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
          <p className="text-xl font-bold">Manage your {''} <span className="text-amber-500">expenses</span></p>
        </div>

      </div>
    </>
  )
}
