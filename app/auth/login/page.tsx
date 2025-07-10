import LoginForm from '@/components/auth/LoginForm'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CashTrackr - Login',
  description: 'CashTrackr - Login'
}

export default function LoginPage() {

  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Login</h1>
      <p className="text-3xl font-bold"> and control your <span className="text-amber-500">finance</span></p>
      <LoginForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href='/auth/register'
          className="text-center text-gray-500"
        >
          Don’t have an account? Sign up
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
