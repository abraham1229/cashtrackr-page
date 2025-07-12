import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";

export default function ConfirmAccountPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Confirm account</h1>
      <p className="text-3xl font-bold"> Enter the code you got <span className="text-amber-500">by email</span></p>
      <ConfirmAccountForm />
    </>
  )
}
