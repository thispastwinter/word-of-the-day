import { User } from "@firebase/auth"
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { auth } from "../firebase"

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        setLoading(false)
        router.push("/")
      } else {
        setUser(user)
        setLoading(false)
        router.push("/signin")
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, loading }
}
