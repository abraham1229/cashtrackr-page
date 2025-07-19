import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";

export default function AddExpenseForm() {
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
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
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