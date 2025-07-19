import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import createExpense from "@/actions/create-expense-action";
import { useFormState } from "react-dom";
import { useParams } from "next/navigation";
import ErrorMessage from "../ui/ErrorMessage";

export default function AddExpenseForm() {
  const { id } = useParams()

  const createExpenseWithBudgetId = createExpense.bind(null, +id)
  const [state, dispatch] = useFormState(createExpenseWithBudgetId, {
    errors: [],
    success: ''
  })

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        New Expense
      </DialogTitle>

      <p className="text-xl font-bold">Fill out the form and create an {''}
        <span className="text-amber-500">expense</span>
      </p>

      {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >
        <ExpenseForm />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Add Expense'
        />
      </form>
    </>
  )
}