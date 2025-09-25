'use client'
import { register } from "@/actions/create-account-action"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage"
import SuccessMessage from "../ui/SuccessMessage"
import { useLoading } from "@/src/contexts/LoadingContext"

export default function RegisterForm() {
  const ref = useRef<HTMLFormElement>(null)
  const { startLoading, stopLoading } = useLoading()
  const [state, dispatch] = useFormState(register, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (state.success) {
      ref.current?.reset()
      stopLoading()
    }
    if (state.errors.length > 0) {
      stopLoading()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const handleSubmit = (formData: FormData) => {
    startLoading()
    dispatch(formData)
  }

  return (
    <form
      ref={ref}
      className="mt-14 space-y-5"
      noValidate
      action={handleSubmit}
    >
      {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
      {state.success && <SuccessMessage>{ state.success }</SuccessMessage>}
      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
          htmlFor="email"
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
        >Name</label>
        <input
          type="name"
          placeholder="Abraham Ortiz"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="name"
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

      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
        >Confirm Password</label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="138A359%9 (same as above)"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password_confirmation"
        />
      </div>

      <input
        type="submit"
        value='Register'
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  )
}
