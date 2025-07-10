import RegisterForm from "@/components/auth/RegisterForm"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CashTrackr - Create Account',
  description: 'CashTrackr - Create Account'
}

export default function RegisterPage() {

  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Create an account</h1>
      <p className="text-3xl font-bold"> and control your <span className="text-amber-500">finance</span></p>
      <RegisterForm />
    </>
  )
}
