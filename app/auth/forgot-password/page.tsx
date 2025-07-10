import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CashTrackr - Forgot password',
  description: 'CashTrackr - Forgot password'
}

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Did you forget your password?</h1>
      <p className="text-3xl font-bold"> you can reset it <span className="text-amber-500">here</span></p>
      <ForgotPasswordForm />
    </>
  )
}
