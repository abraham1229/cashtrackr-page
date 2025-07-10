import LoginForm from '@/components/auth/LoginForm'
import type { Metadata } from 'next'

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
    </>
  )
}
