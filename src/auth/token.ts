import { cookies } from "next/headers";

export default function getToken() {
  return cookies().get('CASHTRACKR_token')?.value
}