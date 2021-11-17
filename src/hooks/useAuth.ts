/* eslint-disable react-hooks/exhaustive-deps */
import { User } from "@firebase/auth"
import { collection, getDocs, query, where } from "@firebase/firestore"
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { Collections } from "../../global/constants"
import { UserPartial } from "../../global/types"
import { auth, db } from "../firebase"

export async function getUserPartial(id: string) {
  const usersRef = collection(db, Collections.USERS)
  const userQuery = query(usersRef, where("id", "==", `${id}`))
  const data = await getDocs(userQuery)
  const userPartial = data?.docs?.[0].data() as UserPartial | undefined
  return { userPartial }
}

export default function useAuth() {
  const [user, setUser] = useState<(User & UserPartial) | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { userPartial } = await getUserPartial(user.uid)
        if (user && userPartial) {
          setUser({ ...user, ...userPartial })
        }
        setLoading(false)
        router.push("/")
      } else {
        setUser(null)
        setLoading(false)
        router.push("/signin")
      }
    })
    return () => unsubscribe()
  }, [])

  return { user, loading }
}
