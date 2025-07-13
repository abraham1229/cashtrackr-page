import getToken from "@/src/auth/token";
import { BudgetsAPIResponseSchema } from "@/src/schemas";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Admin Panel",
  description: "CashTrackr - Admin Panel"
}

async function getUserBudgets() {
  const token = getToken()
  const url = `${process.env.API_URL}/budgets`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const json = await res.json()
  const budgets = BudgetsAPIResponseSchema.parse(json)

  return budgets
}

export default async function AdminPage() {

  const budgets = await getUserBudgets()

  return (
    <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className="font-black text-4xl text-purple-950 my-5">My budgets</h1>
          <p className="text-xl font-bold">Track and manage your {''}
            <span className="text-amber-500">budgets</span>
          </p>
        </div>
        <Link
          href={'/admin/budgets/new'}
          className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Create Budget
        </Link>
      </div>
    </>
  )
}
