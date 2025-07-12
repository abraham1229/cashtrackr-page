
export default function ResetPasswordForm() {
  
  return (
    <form
      className=" mt-14 space-y-5"
      noValidate
    >
      <div className="flex flex-col gap-5">
        <label
          className="font-bold text-2xl"
        >New Password</label>

        <input
          type="password"
          placeholder="138A359%9"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"
        />
      </div>

      <div className="flex flex-col gap-5">
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
        value='Guardar Password'
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  )
}