import "server-only"
import { cache } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { UserSchema } from "../schemas"

export const verifySession = cache(async () => {
  const token = cookies().get('CASHTRACKR_token')?.value

  if (!token) {
    redirect('/auth/login')
  }

  const url = `${process.env.API_URL}/auth/user`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const session = await res.json()

  const user = UserSchema.safeParse(session)

  if (!user.success) {
    redirect('/auth/login')
  }

  // Token was validated
  return {
    user: user.data,
    isAuth: true
  }
})
