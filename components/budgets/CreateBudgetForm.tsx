"use client"

import { createBudget } from "@/actions/create-budget-action"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage"
import SuccessMessage from "../ui/SuccessMessage"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function CreateBudgetForm() {
  const router = useRouter()
  const [state, dispatch] = useFormState(createBudget, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error)
      })
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push('/admin')
        },
        onClick: () => {
          router.push('/admin')
        },
      })
    }
  }, [state])
  

  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      action={dispatch}
    >
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Budget Name
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          type="text"
          placeholder="vacations"
          name="name"
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Budget Amount
        </label>
        <input
          type="number"
          id="amount"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          placeholder="$100"
          name="amount"
        />
      </div>
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Create Budget'
      />
    </form>
  )
}