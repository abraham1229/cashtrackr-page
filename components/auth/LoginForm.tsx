'use client'
import { authenticate } from "@/actions/authenticate-user-action"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

export default function LoginForm() {

  const [state, dispatch] = useFormState(authenticate, {
    errors: []
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error)
      })
    }
  }, [state])

  return (
    <>
      <form
        className="mt-14 space-y-5"
        noValidate
        action={dispatch}
      >
        <div className="flex flex-col gap-2">
          <label
            className="font-bold text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="abraham@email.com"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="font-bold text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="138A359%9"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>

        <input
          type="submit"
          value='Log in'
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  )
}