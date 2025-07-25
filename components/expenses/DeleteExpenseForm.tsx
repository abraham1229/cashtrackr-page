import { useParams, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { useFormState } from "react-dom";
import deleteExpense from "@/actions/delete-expense-action";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";

type DeleteExpenseForm = {
  closeModal: () => void
}

export default function DeleteExpenseForm({ closeModal }: DeleteExpenseForm) {
  const { id: budgetId } = useParams()
  const searchParams = useSearchParams()
  const expenseId = searchParams.get('deleteExpenseId')!

  const deleteExpenseWithBudgetId = deleteExpense.bind(null, {
    budgetId: +budgetId,
    expenseId: +expenseId
  })

  const [state, dispatch] = useFormState(deleteExpenseWithBudgetId, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (!Number.isInteger(+budgetId) || !Number.isInteger(+expenseId)) {
      closeModal()
    }
  }, [closeModal])

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
    }
  }, [state, closeModal])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Delete Expense
      </DialogTitle>
      {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
      <p className="text-xl font-bold">Confirm deletion of the {''}
        <span className="text-amber-500">expense</span>
      </p>
      <p className='text-gray-600 text-sm'>(A deleted expense cannot be recovered)</p>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <button
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          onClick={closeModal}
        >Cancel</button>
        <button
          type='button'
          className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
          onClick={() => dispatch()}
        >Delete</button>
      </div>
    </>
  )
}