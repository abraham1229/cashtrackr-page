"use client"

import { updatePassword } from "@/actions/update-password-action"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"

export default function ChangePasswordForm() {

  const ref = useRef<HTMLFormElement>(null)

  const [state, dispatch] = useFormState(updatePassword, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      ref.current?.reset()
    }
  }, [state])

  return (
    <>
      <form
        className=" mt-14 space-y-5"
        noValidate
        action={dispatch}
        ref={ref}
      >
        {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="current_password"
          >Current Password</label>
          <input
            id="current_password"
            type="password"
            placeholder="138A359%9 (same as above)"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="current_password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="password"
          >New Password</label>
          <input
            id="password"
            type="password"
            placeholder="855A$@kslla"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="password_confirmation"
            className="font-bold text-2xl"
          >Confirm New Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="855A$@kslla (same as above)"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password_confirmation"
          />
        </div>

        <input
          type="submit"
          value='Change Password'
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  )
}