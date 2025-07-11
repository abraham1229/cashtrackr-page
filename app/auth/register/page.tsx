import RegisterForm from "@/components/auth/RegisterForm"
import type { Metadata } from 'next'
import Link from "next/link"

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
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href='/auth/login'
          className="text-center text-gray-500"
        >
          Already have an account? Log in
        </Link>
        
        <Link
          href='/auth/forgot-password'
          className="text-center text-gray-500"
        >
          Forgot your password? Reset it
        </Link>
      </nav>
    </>
  )
}
