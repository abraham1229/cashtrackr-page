import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { DialogTitle } from "@headlessui/react"

export default function ConfirmPasswordForm() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const budgetId = searchParams.get('deleteBudgetId')

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString())
    hideModal.delete('deleteBudgetId')
    router.replace(`${pathname}?${hideModal}`)
  }

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Delete Budget
      </DialogTitle>
      <p className="text-xl font-bold">Enter your password to {''}
        <span className="text-amber-500"> delete the budget {''}</span>
      </p>
      <p className='text-gray-600 text-sm'>(Deleted budgets and their expenses cannot be recovered)</p>
      <form
        className=" mt-14 space-y-5"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="password"
          >Enter your password to delete</label>
          <input
            id="password"
            type="password"
            placeholder="138A359%9"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name='password'
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="submit"
            value='Delete Budget'
            className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
          />
          <button
            className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
            onClick={closeModal}
          >Cancel</button>
        </div>
      </form>

    </>
  )
}